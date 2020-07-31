[![Maintainability](https://api.codeclimate.com/v1/badges/25c7f5fcde8629f768de/maintainability)](https://codeclimate.com/github/Kopyz/backend-project-lvl2/maintainability)
![Node.js CI](https://github.com/Kopyz/backend-project-lvl2/workflows/Node.js%20CI/badge.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/25c7f5fcde8629f768de/test_coverage)](https://codeclimate.com/github/Kopyz/backend-project-lvl2/test_coverage)

## Usage:

1. Difference between ***before.json***
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
   and **after.json**
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
[![asciicast](https://asciinema.org/a/zzTY4kT1mrCHhXGvB1jaoi9Gp.png)](https://asciinema.org/a/zzTY4kT1mrCHhXGvB1jaoi9Gp)

2. Difference between **before.yaml**
```
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
```
   and **after.yaml**
```
timeout: 20
verbose: true
host: hexlet.io
```
[![asciicast](https://asciinema.org/a/Lr2bw6XzzRZkHTU7ZLOt7AJYm.png)](https://asciinema.org/a/Lr2bw6XzzRZkHTU7ZLOt7AJYm)

3. Difference between **before.ini**
```
host=hexlet.io
timeout=50
proxy=123.234.53.22
follow=false
```
   and **after.ini**
```
timeout=20
verbose=true
host=hexlet.io
```
[![asciicast](https://asciinema.org/a/1WSgDf1V6mrrlAsom8KlrNV9M.png)](https://asciinema.org/a/1WSgDf1V6mrrlAsom8KlrNV9M)

4. Difference between tree data structure **before-tree.json**
```
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345
  }
}
```
   and **after-tree.json**
```
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": 100500
  }
}
```
[![asciicast](https://asciinema.org/a/6HU1NS8yom6kA6ZKUPbbUE69X.png)](https://asciinema.org/a/6HU1NS8yom6kA6ZKUPbbUE69X)

5. You can change output data format on **plain** ``gendiff -f plain <file1> <file2>``

[![asciicast](https://asciinema.org/a/9xgDibJXCPd9STnl4kO6spGwz.png)](https://asciinema.org/a/9xgDibJXCPd9STnl4kO6spGwz)

  or on **json** ``gendiff -f json <file1> <file2>``

[![asciicast](https://asciinema.org/a/9xgDibJXCPd9STnl4kO6spGwz.png)](https://asciinema.org/a/9xgDibJXCPd9STnl4kO6spGwz)