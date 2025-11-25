#!/usr/bin/env python3
"""
Automated API Testing Scripts for Mentor AI Backend

This script provides automated testing for all backend API endpoints
using the sample requests from sample-requests.json.

Usage:
    python test-scripts.py                    # Run all tests
    python test-scripts.py --endpoint auth    # Test specific endpoint group
    python test-scripts.py --verbose          # Show detailed output

Requirements:
    pip install requests colorama
"""

import json
import sys
import argparse
from typing import Dict, List, Tuple
from pathlib import Path

try:
    import requests
    from colorama import Fore, Style, init
    init(autoreset=True)
except ImportError:
    print("Error: Required packages not installed.")
    print("Install with: pip install requests colorama")
    sys.exit(1)


class APITester:
    """Automated API testing class for Mentor AI backend"""
    
    def __init__(self, base_url: str = "http://localhost:8000", verbose: bool = False):
        """
        Initialize API tester
        
        Args:
            base_url: Base URL of the API server
            verbose: Enable verbose output
        """
        self.base_url = base_url
        self.verbose = verbose
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
        # Load sample requests
        script_dir = Path(__file__).parent
        sample_file = script_dir / "sample-requests.json"
        
        try:
            with open(sample_file, 'r') as f:
                self.sample_requests = json.load(f)
        except FileNotFoundError:
            print(f"{Fore.RED}Error: sample-requests.json not found at {sample_file}")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"{Fore.RED}Error: Invalid JSON in sample-requests.json: {e}")
            sys.exit(1)
    
    def print_header(self, text: str):
        """Print formatted header"""
        print(f"\n{Fore.CYAN}{'=' * 70}")
        print(f"{Fore.CYAN}{text.center(70)}")
        print(f"{Fore.CYAN}{'=' * 70}\n")
    
    def print_test(self, name: str, status: str, message: str = ""):
        """Print test result"""
        if status == "PASS":
            icon = "✓"
            color = Fore.GREEN
            self.results["passed"] += 1
        elif status == "FAIL":
            icon = "✗"
            color = Fore.RED
            self.results["failed"] += 1
            self.results["errors"].append(f"{name}: {message}")
        else:
            icon = "⚠"
            color = Fore.YELLOW
        
        print(f"{color}{icon} {name}{Style.RESET_ALL}")
        if message and (self.verbose or status == "FAIL"):
            print(f"  {message}")
    
    def test_health_check(self) -> bool:
        """Test if API server is running"""
        try:
            response = requests.get(f"{self.base_url}/health", timeout=5)
            if response.status_code == 200:
                self.print_test("Health Check", "PASS", f"Server is running at {self.base_url}")
                return True
            else:
                self.print_test("Health Check", "FAIL", f"Unexpected status code: {response.status_code}")
                return False
        except requests.exceptions.ConnectionError:
            self.print_test("Health Check", "FAIL", f"Cannot connect to {self.base_url}")
            return False
        except Exception as e:
            self.print_test("Health Check", "FAIL", f"Error: {str(e)}")
            return False
    
    def test_endpoint(self, name: str, config: Dict) -> bool:
        """
        Test a single API endpoint
        
        Args:
            name: Test name
            config: Endpoint configuration from sample-requests.json
        
        Returns:
            True if test passed, False otherwise
        """
        endpoint = config.get("endpoint", "")
        description = config.get("description", "")
        request_data = config.get("request", {})
        expected_response = config.get("expected_response", {})
        
        # Parse endpoint (e.g., "POST /api/auth/register")
        parts = endpoint.split(" ", 1)
        if len(parts) != 2:
            self.print_test(name, "FAIL", f"Invalid endpoint format: {endpoint}")
            return False
        
        method, path = parts
        url = f"{self.base_url}{path}"
        
        # Replace path parameters (e.g., {test_id})
        for key, value in request_data.items():
            placeholder = f"{{{key}}}"
            if placeholder in url:
                url = url.replace(placeholder, str(value))
        
        if self.verbose:
            print(f"\n{Fore.YELLOW}Testing: {name}")
            print(f"Description: {description}")
            print(f"Method: {method}")
            print(f"URL: {url}")
            print(f"Request: {json.dumps(request_data, indent=2)}")
        
        try:
            # Make request
            if method == "GET":
                response = requests.get(url, params=request_data, timeout=10)
            elif method == "POST":
                response = requests.post(url, json=request_data, timeout=10)
            elif method == "PUT":
                response = requests.put(url, json=request_data, timeout=10)
            elif method == "DELETE":
                response = requests.delete(url, timeout=10)
            else:
                self.print_test(name, "FAIL", f"Unsupported method: {method}")
                return False
            
            # Check response
            if response.status_code in [200, 201]:
                self.print_test(name, "PASS", f"Status: {response.status_code}")
                
                if self.verbose:
                    try:
                        print(f"Response: {json.dumps(response.json(), indent=2)}")
                    except:
                        print(f"Response: {response.text}")
                
                return True
            else:
                error_msg = f"Status: {response.status_code}"
                try:
                    error_data = response.json()
                    error_msg += f" - {error_data.get('detail', error_data)}"
                except:
                    error_msg += f" - {response.text[:100]}"
                
                self.print_test(name, "FAIL", error_msg)
                return False
                
        except requests.exceptions.Timeout:
            self.print_test(name, "FAIL", "Request timeout")
            return False
        except requests.exceptions.ConnectionError:
            self.print_test(name, "FAIL", "Connection error")
            return False
        except Exception as e:
            self.print_test(name, "FAIL", f"Error: {str(e)}")
            return False
    
    def test_endpoint_group(self, group_name: str) -> Tuple[int, int]:
        """
        Test all endpoints in a group
        
        Args:
            group_name: Name of the endpoint group (e.g., 'authentication')
        
        Returns:
            Tuple of (passed, failed) counts
        """
        if group_name not in self.sample_requests:
            print(f"{Fore.RED}Error: Endpoint group '{group_name}' not found")
            return 0, 0
        
        self.print_header(f"Testing {group_name.upper()} Endpoints")
        
        group = self.sample_requests[group_name]
        passed = 0
        failed = 0
        
        for endpoint_name, config in group.items():
            test_name = f"{group_name}.{endpoint_name}"
            if self.test_endpoint(test_name, config):
                passed += 1
            else:
                failed += 1
        
        return passed, failed
    
    def test_all(self):
        """Test all endpoint groups"""
        self.print_header("Mentor AI Backend API Tests")
        
        # First check if server is running
        if not self.test_health_check():
            print(f"\n{Fore.RED}Cannot proceed: API server is not running")
            print(f"{Fore.YELLOW}Start the server with: uvicorn main:app --reload")
            return
        
        # Test all endpoint groups
        for group_name in self.sample_requests.keys():
            self.test_endpoint_group(group_name)
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        total = self.results["passed"] + self.results["failed"]
        
        self.print_header("Test Summary")
        
        print(f"Total Tests: {total}")
        print(f"{Fore.GREEN}Passed: {self.results['passed']}")
        print(f"{Fore.RED}Failed: {self.results['failed']}")
        
        if self.results["failed"] > 0:
            print(f"\n{Fore.RED}Failed Tests:")
            for error in self.results["errors"]:
                print(f"  • {error}")
        
        # Calculate success rate
        if total > 0:
            success_rate = (self.results["passed"] / total) * 100
            print(f"\n{Fore.CYAN}Success Rate: {success_rate:.1f}%")
            
            if success_rate == 100:
                print(f"\n{Fore.GREEN}🎉 All tests passed! Your API is working correctly.")
            elif success_rate >= 80:
                print(f"\n{Fore.YELLOW}⚠️  Most tests passed, but some endpoints need attention.")
            else:
                print(f"\n{Fore.RED}❌ Many tests failed. Check your API implementation.")


def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description="Automated API testing for Mentor AI backend"
    )
    parser.add_argument(
        "--base-url",
        default="http://localhost:8000",
        help="Base URL of the API server (default: http://localhost:8000)"
    )
    parser.add_argument(
        "--endpoint",
        help="Test specific endpoint group (e.g., auth, onboarding, diagnostic_test)"
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Show detailed output"
    )
    parser.add_argument(
        "--list",
        action="store_true",
        help="List available endpoint groups"
    )
    
    args = parser.parse_args()
    
    tester = APITester(base_url=args.base_url, verbose=args.verbose)
    
    if args.list:
        print(f"\n{Fore.CYAN}Available Endpoint Groups:")
        for group in tester.sample_requests.keys():
            endpoints = tester.sample_requests[group]
            print(f"  • {group} ({len(endpoints)} endpoints)")
        return
    
    if args.endpoint:
        # Test specific endpoint group
        tester.test_health_check()
        tester.test_endpoint_group(args.endpoint)
        tester.print_summary()
    else:
        # Test all endpoints
        tester.test_all()


if __name__ == "__main__":
    main()
