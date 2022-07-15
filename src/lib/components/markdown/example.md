# Headers

The header options range from h1 to h4.

```
# H1
## H2
### H3
#### H4
```

# H1 Lorem ipsum non sunt qui sunt

## H2 Lorem ipsum non sunt qui sunt

### H3 Lorem ipsum non sunt qui sunt

#### H4 Lorem ipsum non sunt qui sunt

# Emphasis

```
Emphasis or italics, use *asterisk* or _underscore_.
Strong emphasis or bold, use **asterisks** or __underscores__.
Combined emphasis, use **_asterisks and underscores_**.
```

Emphasis or italics, use _asterisk_ or _underscore_.

Strong emphasis or bold, use **asterisks** or **underscores**.

Combined emphasis, use **_asterisks and underscores_**.

# Lists

```
1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.

- Unordered list can use asterisks
- Or minuses
- Or pluses

# Links

For links markdown syntax should be used.

```
[This is an inline link](https://feather-insurance.com)
```

[This is an inline link](https://feather-insurance.com)

# Custom Markdown tags

When additional functionality needs to be added to the markdown component, custom tags can be used.

```
Tags in the form of :mytag[value]{attributes} will be converted to the corresponding
custom HTML tags <mytag ...attributes>value<mytag>.

Custom styling for these tags can be provided by passing the customMDComponents prop
<Markdown customMDComponents={
  mytag: ({ children }) => (<h1>{childrend}</h1>)
}>
```
