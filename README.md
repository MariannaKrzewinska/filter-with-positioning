# Proof of concept of a factor for positioning (when filtering) (JS version)

Can be used by simple search based on similarity not only in existance in both words but also on distance between found letters

```
x - no. of letters found in a word
y - no. of letters in query
z - average distance between found letters

factor = x / (y * z)
```
