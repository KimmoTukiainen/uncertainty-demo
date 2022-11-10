# Uncertainty and complexity

## Support material for Tech Talk

This is a demo of how uncertainty creates complexity in code. It is created in:

- optional arguments
- optional properties
- optional chaining

Function complexity comes from:

- space of allowed inputs
- space of possible outputs

What kinds of states do we allow?

- finite states
- vs. complex states

## Analysis

There's only three valid states for a product list

|                           | ProductList | FiniteProductList |
| ------------------------- | ----------- | ----------------- |
| amount of possible states | 20          | 3                 |

## Complexity's impact on test coverage

1. `npm run test:coverage`
2. Compare FiniteProductList and ProductList

You should notice that optional values create need for extra tests, or to put it the other way around:
**Removing optional values reduces the need for tests**.
