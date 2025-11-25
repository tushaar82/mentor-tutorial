# RAG Development Guide: Step-by-Step

## Introduction

This guide walks you through building a RAG (Retrieval-Augmented Generation) system from scratch, explaining each component and how they work together.

---

## What You'll Build

A complete RAG pipeline that:
1. Takes a topic as input
2. Retrieves relevant syllabus content
3. Formats content as context
4. Generates questions using LLM
5. Validates and stores questions

**Input**: "Generate 5 medium difficulty questions on Limits"
**Output**: 5 high-quality, curriculum-aligned questions

---

## Prerequisites

Before starting, ensure you have:
- ✅ Vector Search working (Day 4)
- ✅ Gemini API enabled
- ✅ Understanding of embeddings and LLMs
- ✅ Python environment set up

---

## Step 1: Set Up Gemini Client

### Goal
Create a client that can call Gemini API.

### Why This Matters
This is your interface to the LLM. Everything else builds on this.

### Implementation

```python
# utils/gemini_client.py

import vertexai
from vertexai.generative_models import GenerativeModel
import os
from dotenv import load_dotenv

class GeminiClient:
    def __init__(self):
        load_dotenv()
        
        # Initialize Vertex AI
        project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
        location = os.getenv("GOOGLE_CLOUD_LOCATION")
        vertexai.init(project=project_id, location=location)
        
        # Create model
        self.model = GenerativeModel("gemini-1.5-flash")
        
        # Configuration
        self.generation_config = {
            "temperature": 0.7,
            "top_p": 0.9,
            "top_k": 40,
            "max_output_tokens": 2048,
        }
    
    def generate_content(self, prompt: str) -> str:
        """Generate content from prompt."""
        response = self.model.generate_content(
            prompt,
            generation_config=self.generation_config
        )
        return response.text
```

### Test It

```python
from utils.gemini_client import GeminiClient

client = GeminiClient()
response = client.generate_content("Say hello!")
print(response)  # Should print "Hello!" or similar
```

### What You Learned
- How to initialize Vertex AI
- How to configure Gemini parameters
- How to make basic API calls

---

## Step 2: Create Prompt Templates

### Goal
Build reusable templates for different question types.

### Why This Matters
Good prompts = good questions. Templates ensure consistency.

### Implementation

```python
# utils/prompt_templates.py

def get_jee_main_template(topic: str, context: str, difficulty: str, num_questions: int) -> str:
    return f"""
You are an expert JEE Main question generator.

CRITICAL RULES:
1. Use ONLY the syllabus content provided below
2. Do NOT invent formulas or concepts not in the content
3. Ensure correct answer is actually correct
4. Provide detailed, step-by-step explanations

SYLLABUS CONTENT:
{context}

TASK:
Generate {num_questions} multiple-choice questions on "{topic}" with:
- Difficulty: {difficulty}
- Format: Single correct answer (A/B/C/D)
- Based on the syllabus content above

OUTPUT FORMAT:
Return ONLY a JSON array:
[
  {{
    "question": "Clear question text with LaTeX if needed",
    "options": {{"A": "...", "B": "...", "C": "...", "D": "..."}},
    "correct_answer": "A",
    "explanation": "Step-by-step explanation",
    "difficulty": "{difficulty}",
    "topic": "{topic}"
  }}
]

EXAMPLE:
[
  {{
    "question": "What is the limit of sin(x)/x as x approaches 0?",
    "options": {{"A": "0", "B": "1", "C": "∞", "D": "undefined"}},
    "correct_answer": "B",
    "explanation": "This is a standard limit. Using L'Hôpital's rule or series expansion, lim(x→0) sin(x)/x = 1",
    "difficulty": "medium",
    "topic": "Limits and Continuity"
  }}
]

Generate the questions now:
"""

def build_prompt(exam_type: str, topic: str, context: str, difficulty: str, num_questions: int) -> str:
    """Build prompt based on exam type."""
    if exam_type == "JEE_MAIN":
        return get_jee_main_template(topic, context, difficulty, num_questions)
    elif exam_type == "NEET":
        return get_neet_template(topic, context, difficulty, num_questions)
    else:
        raise ValueError(f"Unknown exam type: {exam_type}")
```

### Test It

```python
from utils.prompt_templates import build_prompt

prompt = build_prompt(
    exam_type="JEE_MAIN",
    topic="Limits",
    context="Limits: Definition, properties...",
    difficulty="medium",
    num_questions=3
)

print(len(prompt))  # Should be 1000-2000 characters
print("SYLLABUS CONTENT:" in prompt)  # Should be True
```

### What You Learned
- How to structure prompts for LLMs
- Importance of explicit instructions
- How to use few-shot learning (examples)

---

## Step 3: Build Context from Vector Search

### Goal
Format Vector Search results into LLM-ready context.

### Why This Matters
Context quality directly affects question quality.

### Implementation

```python
# services/context_builder.py

import tiktoken

class ContextBuilder:
    def __init__(self):
        self.tokenizer = tiktoken.get_encoding("cl100k_base")
    
    def build_context(self, search_results: list, max_tokens: int = 3000) -> str:
        """Build structured context from search results."""
        context_parts = []
        
        # Header
        context_parts.append("SYLLABUS CONTENT FOR QUESTION GENERATION")
        context_parts.append("=" * 50)
        
        # Add each result
        for i, result in enumerate(search_results, 1):
            # Check token limit
            current_context = "\n".join(context_parts)
            if self._count_tokens(current_context) > max_tokens:
                break
            
            # Add result
            context_parts.append(f"\n## Source {i} (Relevance: {result['score']:.2f})")
            context_parts.append(f"Chapter: {result['metadata'].get('chapter', 'N/A')}")
            context_parts.append(f"Weightage: {result['metadata'].get('weightage', 'N/A')} marks")
            context_parts.append(f"\nContent:")
            context_parts.append(result['text'])
        
        return "\n".join(context_parts)
    
    def _count_tokens(self, text: str) -> int:
        """Count tokens in text."""
        return len(self.tokenizer.encode(text))
```

### Test It

```python
from services.context_builder import ContextBuilder

# Mock search results
mock_results = [
    {
        "text": "Limits: A limit describes...",
        "score": 0.95,
        "metadata": {"chapter": "Calculus", "weightage": 8}
    }
]

builder = ContextBuilder()
context = builder.build_context(mock_results)

print(len(context))  # Should be reasonable length
print("SYLLABUS CONTENT" in context)  # Should be True
print("Relevance:" in context)  # Should be True
```

### What You Learned
- How to format context for LLMs
- Importance of structure (headers, sections)
- How to manage token limits

---

## Step 4: Parse LLM Responses

### Goal
Extract and validate questions from LLM output.

### Why This Matters
LLMs don't always return perfect JSON. Need robust parsing.

### Implementation

```python
# utils/response_parser.py

import json
import re
from typing import List, Optional

class ResponseParser:
    def parse_response(self, text: str) -> List[dict]:
        """Parse questions from LLM response."""
        # Try direct JSON parse
        try:
            questions = json.loads(text)
            return self._validate_questions(questions)
        except:
            pass
        
        # Extract JSON from markdown code blocks
        json_match = re.search(r'```json\n(.*?)\n```', text, re.DOTALL)
        if json_match:
            try:
                questions = json.loads(json_match.group(1))
                return self._validate_questions(questions)
            except:
                pass
        
        # Extract JSON array from text
        json_match = re.search(r'\[.*\]', text, re.DOTALL)
        if json_match:
            try:
                questions = json.loads(json_match.group(0))
                return self._validate_questions(questions)
            except:
                pass
        
        # Give up
        return []
    
    def _validate_questions(self, questions: List[dict]) -> List[dict]:
        """Validate question structure."""
        valid_questions = []
        
        for q in questions:
            if self._is_valid_question(q):
                valid_questions.append(q)
        
        return valid_questions
    
    def _is_valid_question(self, q: dict) -> bool:
        """Check if question has required fields."""
        required_fields = ['question', 'options', 'correct_answer', 'explanation']
        
        # Check all fields present
        if not all(field in q for field in required_fields):
            return False
        
        # Check options format
        if not isinstance(q['options'], dict):
            return False
        
        if set(q['options'].keys()) != {'A', 'B', 'C', 'D'}:
            return False
        
        # Check correct answer is valid
        if q['correct_answer'] not in ['A', 'B', 'C', 'D']:
            return False
        
        return True
```

### Test It

```python
from utils.response_parser import ResponseParser

# Test with markdown-wrapped JSON
response = '''
Here are the questions:
```json
[
  {
    "question": "What is 2+2?",
    "options": {"A": "3", "B": "4", "C": "5", "D": "6"},
    "correct_answer": "B",
    "explanation": "2+2=4"
  }
]
```
'''

parser = ResponseParser()
questions = parser.parse_response(response)

print(f"Parsed {len(questions)} questions")  # Should be 1
print(questions[0]['question'])  # Should be "What is 2+2?"
```

### What You Learned
- How to handle various LLM output formats
- Importance of robust parsing
- How to validate data structures

---

## Step 5: Validate Question Quality

### Goal
Check if questions meet quality standards.

### Why This Matters
Not all generated questions are good. Need quality control.

### Implementation

```python
# services/question_validator.py

from typing import List, Tuple

class QuestionValidator:
    def validate(self, question: dict, context: str) -> Tuple[bool, int, List[str]]:
        """
        Validate question quality.
        
        Returns:
            (is_valid, quality_score, issues)
        """
        issues = []
        score = 100
        
        # Check question length
        if len(question['question']) < 20:
            issues.append("Question too short")
            score -= 20
        
        # Check options are distinct
        options = list(question['options'].values())
        if len(options) != len(set(options)):
            issues.append("Options are not distinct")
            score -= 30
        
        # Check explanation length
        if len(question['explanation']) < 30:
            issues.append("Explanation too short")
            score -= 20
        
        # Check if question uses context
        question_text = question['question'].lower()
        context_lower = context.lower()
        
        # Extract key terms from context
        context_terms = set(re.findall(r'\b\w{5,}\b', context_lower))
        question_terms = set(re.findall(r'\b\w{5,}\b', question_text))
        
        # Check overlap
        overlap = len(context_terms & question_terms)
        if overlap < 2:
            issues.append("Question may not be based on provided context")
            score -= 25
        
        is_valid = score >= 70
        
        return is_valid, score, issues
```

### Test It

```python
from services.question_validator import QuestionValidator

# Good question
good_q = {
    "question": "What is the limit of sin(x)/x as x approaches 0?",
    "options": {"A": "0", "B": "1", "C": "∞", "D": "undefined"},
    "correct_answer": "B",
    "explanation": "This is a standard limit. Using L'Hôpital's rule, lim(x→0) sin(x)/x = 1"
}

context = "Standard limits: sin(x)/x approaches 1 as x approaches 0"

validator = QuestionValidator()
is_valid, score, issues = validator.validate(good_q, context)

print(f"Valid: {is_valid}, Score: {score}")  # Should be True, 100
print(f"Issues: {issues}")  # Should be []
```

### What You Learned
- How to define quality criteria
- Importance of validation
- How to score questions

---

## Step 6: Put It All Together (RAG Pipeline)

### Goal
Combine all components into complete RAG pipeline.

### Why This Matters
This is the final product - the complete RAG system.

### Implementation

```python
# services/rag_service.py

from services.context_builder import ContextBuilder
from services.question_validator import QuestionValidator
from utils.gemini_client import GeminiClient
from utils.prompt_templates import build_prompt
from utils.response_parser import ResponseParser

class RAGService:
    def __init__(self, vector_search_service):
        self.vector_search = vector_search_service
        self.context_builder = ContextBuilder()
        self.gemini_client = GeminiClient()
        self.parser = ResponseParser()
        self.validator = QuestionValidator()
    
    def generate_questions(
        self,
        topic: str,
        exam_type: str,
        difficulty: str,
        num_questions: int
    ) -> dict:
        """Complete RAG pipeline."""
        
        # Step 1: Retrieve relevant content
        search_results = self.vector_search.search(
            query=topic,
            top_k=5,
            filters={"exam": exam_type}
        )
        
        if not search_results:
            raise ValueError(f"No content found for topic: {topic}")
        
        # Step 2: Build context
        context = self.context_builder.build_context(search_results)
        
        # Step 3: Generate prompt
        prompt = build_prompt(exam_type, topic, context, difficulty, num_questions)
        
        # Step 4: Call LLM
        response = self.gemini_client.generate_content(prompt)
        
        # Step 5: Parse response
        questions = self.parser.parse_response(response)
        
        # Step 6: Validate questions
        valid_questions = []
        for q in questions:
            is_valid, score, issues = self.validator.validate(q, context)
            if is_valid:
                q['metadata'] = {
                    'validation_score': score,
                    'generation_method': 'RAG'
                }
                valid_questions.append(q)
        
        return {
            'questions': valid_questions,
            'metadata': {
                'topic': topic,
                'exam_type': exam_type,
                'generation_method': 'RAG'
            },
            'quality_stats': {
                'total_generated': len(questions),
                'valid_count': len(valid_questions),
                'invalid_count': len(questions) - len(valid_questions)
            }
        }
```

### Test It

```python
from services.rag_service import RAGService
from services.vector_search_service import VectorSearchService

# Initialize services
vector_search = VectorSearchService()
rag = RAGService(vector_search)

# Generate questions
result = rag.generate_questions(
    topic="Limits and Continuity",
    exam_type="JEE_MAIN",
    difficulty="medium",
    num_questions=3
)

print(f"Generated {len(result['questions'])} valid questions")
for q in result['questions']:
    print(f"\nQ: {q['question']}")
    print(f"A: {q['correct_answer']}")
    print(f"Score: {q['metadata']['validation_score']}")
```

### What You Learned
- How to orchestrate multiple components
- Importance of error handling
- How to structure service classes

---

## Step 7: Add API Endpoints

### Goal
Expose RAG functionality via REST API.

### Why This Matters
Frontend needs API to call RAG pipeline.

### Implementation

```python
# routers/rag_router.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.rag_service import RAGService

router = APIRouter(prefix="/api/rag", tags=["RAG"])

class RAGRequest(BaseModel):
    topic: str
    exam_type: str
    difficulty: str
    num_questions: int = 5

@router.post("/generate-questions")
async def generate_questions(request: RAGRequest):
    """Generate questions using RAG."""
    try:
        rag_service = RAGService(vector_search_service)
        result = rag_service.generate_questions(
            topic=request.topic,
            exam_type=request.exam_type,
            difficulty=request.difficulty,
            num_questions=request.num_questions
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Test It

```bash
curl -X POST http://localhost:8000/api/rag/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Limits",
    "exam_type": "JEE_MAIN",
    "difficulty": "medium",
    "num_questions": 3
  }'
```

### What You Learned
- How to create FastAPI endpoints
- How to handle requests/responses
- How to add error handling

---

## Step 8: Add Caching

### Goal
Cache results to improve performance and reduce costs.

### Why This Matters
Same topic requested multiple times → cache saves time and money.

### Implementation

```python
# Add to RAGService

from functools import lru_cache
import hashlib

class RAGService:
    def __init__(self, vector_search_service):
        # ... existing code ...
        self.question_cache = {}
    
    def generate_questions(self, topic, exam_type, difficulty, num_questions):
        # Check cache
        cache_key = self._get_cache_key(topic, exam_type, difficulty)
        if cache_key in self.question_cache:
            return self.question_cache[cache_key]
        
        # Generate (existing code)
        result = self._generate_questions_internal(
            topic, exam_type, difficulty, num_questions
        )
        
        # Cache result
        self.question_cache[cache_key] = result
        
        return result
    
    def _get_cache_key(self, topic, exam_type, difficulty):
        """Generate cache key."""
        key_str = f"{topic}_{exam_type}_{difficulty}"
        return hashlib.md5(key_str.encode()).hexdigest()
```

### Test It

```python
# First call - should be slow
result1 = rag.generate_questions("Limits", "JEE_MAIN", "medium", 3)
print(f"First call: {result1['generation_time']:.2f}s")

# Second call - should be fast (cached)
result2 = rag.generate_questions("Limits", "JEE_MAIN", "medium", 3)
print(f"Second call: {result2['generation_time']:.2f}s")  # Should be ~0s
```

### What You Learned
- How to implement caching
- Importance of cache keys
- Performance benefits of caching

---

## Step 9: Add Monitoring

### Goal
Track metrics to monitor RAG performance.

### Why This Matters
Need to know if RAG is working well and where to improve.

### Implementation

```python
# Add to RAGService

import time
import logging

logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self, vector_search_service):
        # ... existing code ...
        self.metrics = {
            'total_requests': 0,
            'successful_requests': 0,
            'failed_requests': 0,
            'total_questions_generated': 0,
            'total_questions_valid': 0,
            'total_generation_time': 0
        }
    
    def generate_questions(self, topic, exam_type, difficulty, num_questions):
        start_time = time.time()
        self.metrics['total_requests'] += 1
        
        try:
            # Generate questions (existing code)
            result = self._generate_questions_internal(...)
            
            # Update metrics
            self.metrics['successful_requests'] += 1
            self.metrics['total_questions_generated'] += len(result['questions'])
            self.metrics['total_questions_valid'] += result['quality_stats']['valid_count']
            
            generation_time = time.time() - start_time
            self.metrics['total_generation_time'] += generation_time
            result['generation_time'] = generation_time
            
            logger.info(f"RAG success: {len(result['questions'])} questions in {generation_time:.2f}s")
            
            return result
            
        except Exception as e:
            self.metrics['failed_requests'] += 1
            logger.error(f"RAG failed: {e}")
            raise
    
    def get_metrics(self):
        """Get RAG metrics."""
        return {
            **self.metrics,
            'success_rate': self.metrics['successful_requests'] / max(self.metrics['total_requests'], 1),
            'avg_generation_time': self.metrics['total_generation_time'] / max(self.metrics['successful_requests'], 1),
            'avg_valid_rate': self.metrics['total_questions_valid'] / max(self.metrics['total_questions_generated'], 1)
        }
```

### Test It

```python
# Generate some questions
rag.generate_questions("Limits", "JEE_MAIN", "medium", 3)
rag.generate_questions("Differentiation", "JEE_MAIN", "hard", 5)

# Check metrics
metrics = rag.get_metrics()
print(f"Success rate: {metrics['success_rate']:.2%}")
print(f"Avg generation time: {metrics['avg_generation_time']:.2f}s")
print(f"Avg valid rate: {metrics['avg_valid_rate']:.2%}")
```

### What You Learned
- How to track metrics
- Importance of monitoring
- How to calculate success rates

---

## Complete Example

Here's a complete example using the RAG pipeline:

```python
from services.rag_service import RAGService
from services.vector_search_service import VectorSearchService

# Initialize
vector_search = VectorSearchService()
rag = RAGService(vector_search)

# Generate questions
result = rag.generate_questions(
    topic="Limits and Continuity",
    exam_type="JEE_MAIN",
    difficulty="medium",
    num_questions=5
)

# Display results
print(f"\nGenerated {len(result['questions'])} questions in {result['generation_time']:.2f}s")
print(f"Quality stats: {result['quality_stats']}")

for i, q in enumerate(result['questions'], 1):
    print(f"\n{'='*60}")
    print(f"Question {i}:")
    print(f"{'='*60}")
    print(f"\n{q['question']}")
    print(f"\nOptions:")
    for opt, text in q['options'].items():
        marker = "✓" if opt == q['correct_answer'] else " "
        print(f"  {marker} {opt}) {text}")
    print(f"\nExplanation: {q['explanation']}")
    print(f"Validation Score: {q['metadata']['validation_score']}/100")
```

---

## Troubleshooting

### Issue: No questions generated

**Check**:
1. Vector Search returning results?
2. Context being built correctly?
3. Gemini API responding?
4. Parser extracting questions?

**Debug**:
```python
# Check each step
results = vector_search.search("Limits", top_k=5)
print(f"Search results: {len(results)}")

context = context_builder.build_context(results)
print(f"Context length: {len(context)}")

prompt = build_prompt("JEE_MAIN", "Limits", context, "medium", 3)
print(f"Prompt length: {len(prompt)}")

response = gemini_client.generate_content(prompt)
print(f"Response: {response[:200]}")

questions = parser.parse_response(response)
print(f"Parsed questions: {len(questions)}")
```

### Issue: Low quality questions

**Check**:
1. Context quality (relevant content?)
2. Prompt clarity (explicit instructions?)
3. Validation rules (too strict?)

**Fix**:
```python
# Improve context
context = build_better_context(results, include_examples=True)

# Strengthen prompt
prompt = add_quality_requirements(prompt)

# Adjust validation
validator.min_score = 60  # Lower threshold
```

### Issue: Slow generation

**Check**:
1. Caching enabled?
2. Context too long?
3. Too many API calls?

**Fix**:
```python
# Enable caching
@lru_cache(maxsize=100)
def generate_questions(...):
    ...

# Reduce context
context = optimize_context(results, max_tokens=2000)

# Batch requests
results = await asyncio.gather(*[
    generate_questions(topic) for topic in topics
])
```

---

## Next Steps

You've built a complete RAG system! Now:

1. **Test thoroughly** (TESTING.md)
2. **Optimize performance** (caching, batching)
3. **Monitor quality** (metrics, logging)
4. **Iterate and improve** (better prompts, validation)

**Ready for Day 6?** Use RAG to generate complete diagnostic tests!
