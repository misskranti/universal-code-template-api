# Universal Code Template Generator API

A production-ready HTTP API that generates executable code templates for Data Structures and Algorithms (DSA) problems across multiple programming languages. This service enables content authors to provide only problem statements while automatically generating language-specific boilerplate code.

## Features

- **Multi-language Support**: Java 17, Python 3.12, C++20, JavaScript (Node 20)
- **Type-safe Code Generation**: Supports primitive types, arrays, lists, trees, and graphs
- **Idiomatic Code**: Follows language-specific naming conventions and structures
- **Comprehensive Validation**: Detailed error messages for malformed requests
- **Production Ready**: Includes error handling, logging, and health checks
- **Extensible Architecture**: Easy to add new languages and types

## Quick Start

### Prerequisites

- Node.js 20.0.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/misskranti/universal-code-template-api.git
cd code-template-api

# Install dependencies
npm install

# Start the server
npm start
```

The API will be available at `http://localhost:3000`

### Development Mode

```bash
# Start with auto-reload
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## API Documentation

### Generate Code Template

**POST** `/api/v1/template`

Generates an executable code template for a given DSA problem.

#### Request Body

```json
{
  "question_id": "two-sum",
  "title": "Two Sum",
  "description": "Given an integer array nums and an integer target, return indices of the two numbers such that they add up to target.",
  "signature": {
    "function_name": "twoSum",
    "parameters": [
      { "name": "nums", "type": "int[]" },
      { "name": "target", "type": "int" }
    ],
    "returns": { "type": "int[]" }
  },
  "language": "python"
}
```

#### Response (HTTP 201)

```json
{
  "language": "python",
  "template": "from typing import List, Optional\nimport sys\nimport json\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your logic here\n        pass\n\nif __name__ == \"__main__\":\n    # Do not edit below this line\n    data = json.loads(sys.stdin.read())\n    solution = Solution()\n    result = solution.twoSum(**data)\n    print(json.dumps(result))"
}
```

### Health Check

**GET** `/health`

Returns the health status of the API.

#### Response (HTTP 200)

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Supported Types

The API uses a language-agnostic Type Signature DSL:

| DSL Token | Description | Examples |
|-----------|-------------|----------|
| `int` | 32-bit signed integer | `int` |
| `long` | 64-bit signed integer | `long` |
| `float` | IEEE-754 32-bit float | `float` |
| `double` | IEEE-754 64-bit double | `double` |
| `bool` | Boolean | `bool` |
| `string` | UTF-8 string | `string` |
| `T[]` | Dynamic array | `int[]`, `string[]` |
| `List<T>` | List/Vector | `List<int>`, `List<string[]>` |
| `Tree<T>` | Binary tree node | `Tree<int>`, `Tree<string>` |
| `Graph` | Adjacency list | `Graph` |

### Type Mappings

| DSL Type | Java | Python | C++ | JavaScript |
|----------|------|--------|-----|------------|
| `int` | `int` | `int` | `int` | `number` |
| `string` | `String` | `str` | `string` | `string` |
| `int[]` | `int[]` | `List[int]` | `vector<int>` | `number[]` |
| `List<int>` | `List<Integer>` | `List[int]` | `vector<int>` | `number[]` |
| `Tree<int>` | `TreeNode` | `Optional[TreeNode]` | `TreeNode*` | `TreeNode \| null` |
| `Graph` | `int[][]` | `List[List[int]]` | `vector<vector<int>>` | `number[][]` |

## Example Usage

### Single Primitive Input (Fibonacci)

```bash
curl -X POST http://localhost:3000/api/v1/template \
  -H "Content-Type: application/json" \
  -d '{
    "question_id": "fibonacci",
    "title": "Fibonacci Number",
    "description": "Calculate the nth Fibonacci number",
    "signature": {
      "function_name": "fibonacci",
      "parameters": [{"name": "n", "type": "int"}],
      "returns": {"type": "int"}
    },
    "language": "python"
  }'
```

### Multiple Mixed Inputs

```bash
curl -X POST http://localhost:3000/api/v1/template \
  -H "Content-Type: application/json" \
  -d '{
    "question_id": "merge-k-lists",
    "title": "Merge K Sorted Lists",
    "description": "Merge k sorted linked lists",
    "signature": {
      "function_name": "mergeKLists",
      "parameters": [{"name": "lists", "type": "List<List<int>>"}],
      "returns": {"type": "List<int>"}
    },
    "language": "java"
  }'
```

### Tree Operations

```bash
curl -X POST http://localhost:3000/api/v1/template \
  -H "Content-Type: application/json" \
  -d '{
    "question_id": "lca",
    "title": "Lowest Common Ancestor",
    "description": "Find LCA of two nodes in binary tree",
    "signature": {
      "function_name": "lowestCommonAncestor",
      "parameters": [
        {"name": "root", "type": "Tree<int>"},
        {"name": "p", "type": "Tree<int>"},
        {"name": "q", "type": "Tree<int>"}
      ],
      "returns": {"type": "Tree<int>"}
    },
    "language": "cpp"
  }'
```

### Graph Operations

```bash
curl -X POST http://localhost:3000/api/v1/template \
  -H "Content-Type: application/json" \
  -d '{
    "question_id": "detect-cycle",
    "title": "Detect Cycle",
    "description": "Detect if there is a cycle in the graph",
    "signature": {
      "function_name": "detectCycle",
      "parameters": [{"name": "graph", "type": "Graph"}],
      "returns": {"type": "bool"}
    },
    "language": "javascript"
  }'
```

## Error Handling

The API provides detailed error messages for various failure scenarios:

### Validation Errors (HTTP 400)

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "signature.function_name",
      "message": "signature.function_name must be a non-empty string",
      "value": ""
    }
  ]
}
```

### Unsupported Language (HTTP 400)

```json
{
  "error": "Unsupported language",
  "details": "Language 'ruby' is not supported"
}
```

### Invalid Type (HTTP 400)

```json
{
  "error": "Invalid parameter type",
  "details": "Type 'custom_type' is not supported for language 'python'"
}
```

## Testing

The project includes comprehensive test coverage for all scenarios:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Scenarios

1. **Single primitive input**: Fibonacci(n: int) → int
2. **Multiple mixed inputs**: MergeKLists(lists: List<List<int>>) → List<int>
3. **Tree operations**: LowestCommonAncestor(root: Tree<int>, p: Tree<int>, q: Tree<int>) → Tree<int>
4. **Graph operations**: DetectCycle(graph: Graph) → bool
5. **Validation tests**: Malformed requests, unsupported languages, invalid types
6. **Edge cases**: No parameters, void returns, complex nested types

## Architecture

### Core Components

- **TemplateGenerator**: Language-specific template generation logic
- **TYPE_MAPPINGS**: Type translation between DSL and target languages
- **Validation Middleware**: Request validation using express-validator
- **Error Handling**: Comprehensive error handling with detailed messages

### Extensibility

Adding support for new languages:

1. Add type mappings to `TYPE_MAPPINGS`
2. Implement a generator method in `TemplateGenerator`
3. Add validation for the new language
4. Update tests to cover the new language

Adding new types:

1. Add DSL token to type mappings for all languages
2. Update validation logic if needed
3. Add test cases for the new type

## Production Considerations

- **Environment Variables**: Use `PORT` environment variable for port configuration
- **Logging**: Implement structured logging for production deployments
- **Rate Limiting**: Add rate limiting middleware for production use
- **Security**: Implement authentication and authorization as needed
- **Monitoring**: Add metrics and health checks for monitoring
- **Caching**: Consider caching frequently requested templates


