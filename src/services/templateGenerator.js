const TYPE_MAPPINGS = require('../config/typeMappings');

class TemplateGenerator {
  static generateJavaTemplate(signature, questionId, title, description) {
    const { function_name, parameters, returns } = signature;
    const className = 'Solution';
    
    // Generate imports
    let imports = ['import java.util.*;', 'import java.io.*;'];
    
    // Check if TreeNode is needed
    const needsTreeNode = parameters.some(p => p.type.includes('Tree')) || 
                         (returns && returns.type && returns.type.includes('Tree'));
    
    // Generate TreeNode class if needed
    let treeNodeClass = '';
    if (needsTreeNode) {
      treeNodeClass = `
// Definition for a binary tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
`;
    }
    
    // Generate method signature
    const returnType = returns ? TYPE_MAPPINGS.java[returns.type] || returns.type : 'void';
    const params = parameters.map(p => {
      const type = TYPE_MAPPINGS.java[p.type] || p.type;
      return `${type} ${p.name}`;
    }).join(', ');
    
    // Generate main method for testing
    const mainMethod = `
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        
        // Parse JSON input and call solution method
        // Implementation depends on specific input format
        Solution solution = new Solution();
        // System.out.println(solution.${function_name}(...));
    }`;
    
    return `${imports.join('\n')}
${treeNodeClass}
public class ${className} {
    public ${returnType} ${function_name}(${params}) {
        // Write your logic here
        ${returnType === 'void' ? '' : 'return null; // TODO: Implement'}
    }
${mainMethod}
}`;
  }
  
  static generatePythonTemplate(signature, questionId, title, description) {
    const { function_name, parameters, returns } = signature;
    
    // Generate imports
    let imports = ['from typing import List, Optional', 'import sys', 'import json'];
    
    // Check if TreeNode is needed
    const needsTreeNode = parameters.some(p => p.type.includes('Tree')) || 
                         (returns && returns.type && returns.type.includes('Tree'));
    
    // Generate TreeNode class if needed
    let treeNodeClass = '';
    if (needsTreeNode) {
      treeNodeClass = `
# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
`;
    }
    
    // Generate method signature
    const returnType = returns ? TYPE_MAPPINGS.python[returns.type] || returns.type : 'None';
    const params = parameters.map(p => {
      const type = TYPE_MAPPINGS.python[p.type] || p.type;
      return `${p.name}: ${type}`;
    }).join(', ');
    
    return `${imports.join('\n')}
${treeNodeClass}
class Solution:
    def ${function_name}(self, ${params}) -> ${returnType}:
        # Write your logic here
        pass

if __name__ == "__main__":
    # Do not edit below this line
    data = json.loads(sys.stdin.read())
    solution = Solution()
    result = solution.${function_name}(**data)
    print(json.dumps(result))`;
  }
  
  static generateCppTemplate(signature, questionId, title, description) {
    const { function_name, parameters, returns } = signature;
    
    // Generate includes
    let includes = [
      '#include <iostream>',
      '#include <vector>',
      '#include <string>',
      '#include <algorithm>',
      '#include <unordered_map>',
      '#include <unordered_set>',
      '#include <queue>',
      '#include <stack>'
    ];
    
    // Check if TreeNode is needed
    const needsTreeNode = parameters.some(p => p.type.includes('Tree')) || 
                         (returns && returns.type && returns.type.includes('Tree'));
    
    // Generate TreeNode struct if needed
    let treeNodeStruct = '';
    if (needsTreeNode) {
      treeNodeStruct = `
// Definition for a binary tree node
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
`;
    }
    
    // Generate method signature
    const returnType = returns ? TYPE_MAPPINGS.cpp[returns.type] || returns.type : 'void';
    const params = parameters.map(p => {
      const type = TYPE_MAPPINGS.cpp[p.type] || p.type;
      return `${type} ${p.name}`;
    }).join(', ');
    
    return `${includes.join('\n')}

using namespace std;
${treeNodeStruct}
class Solution {
public:
    ${returnType} ${function_name}(${params}) {
        // Write your logic here
        ${returnType === 'void' ? '' : 'return {}; // TODO: Implement'}
    }
};

int main() {
    // Input parsing and solution calling code
    Solution solution;
    // solution.${function_name}(...);
    return 0;
}`;
  }
  
  static generateJavaScriptTemplate(signature, questionId, title, description) {
    const { function_name, parameters, returns } = signature;
    
    // Check if TreeNode is needed
    const needsTreeNode = parameters.some(p => p.type.includes('Tree')) || 
                         (returns && returns.type && returns.type.includes('Tree'));
    
    // Generate TreeNode class if needed
    let treeNodeClass = '';
    if (needsTreeNode) {
      treeNodeClass = `
// Definition for a binary tree node
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}
`;
    }
    
    // Generate method signature with JSDoc
    const returnType = returns ? TYPE_MAPPINGS.javascript[returns.type] || returns.type : 'void';
    const paramDocs = parameters.map(p => {
      const type = TYPE_MAPPINGS.javascript[p.type] || p.type;
      return ` * @param {${type}} ${p.name}`;
    }).join('\n');
    
    return `${treeNodeClass}
/**
${paramDocs}
 * @return {${returnType}}
 */
var ${function_name} = function(${parameters.map(p => p.name).join(', ')}) {
    // Write your logic here
    
};

// Input parsing and solution execution
if (require.main === module) {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8');
    const data = JSON.parse(input);
    const result = ${function_name}(...Object.values(data));
    console.log(JSON.stringify(result));
}

module.exports = ${function_name};`;
  }
}

module.exports = TemplateGenerator;