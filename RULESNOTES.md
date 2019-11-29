Given a 3x3 grid, with a live cell in the middle
```
  012
0 ooo
1 oxo
2 ooo

live cell is at x=1, y=1

y = row you're in, aka element in array of arrays
x = position in row, aka element within one of those arrays
```

Neighbouring positions have the coordinates obtainable by these vectors:
Use different signs to control what position on vector:

(x,y)

- [1,1] +ve = diagonal top left, -ve = bottom right
- [1,0] horizontal, +ve = right, -ve = left
- [0,1] vertical, +ve = down, -ve = up
- [-1,1] +ve = diagonal bottom right, -ve = top right
