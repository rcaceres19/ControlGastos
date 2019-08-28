
## II. Structure

#### 1. Components Structure

```
  App
   |___ Summary
   |___ Form _ _ _ _ RecordsAPI
   |                    |
   |___ Table           |
           |_______ TableRow
                        |____ TableDisplay
                        |____ TableEdit

```

- **App Component:** is the data hub
    - state: `records` for entries in Table component
    - state: `isLoaded` show loading info, before showing Table
    - state: `error`
    - method: `componentDidMount()` get data from database
    - method: `addRecord()` passed to Form
    - method: `deleteRecord()` passed to Table and TableRow
    - method: `updateRecord()` passed to Table and TableRow
    - method: `credits()` passed to Summary
    - method: `debits()` passed to Summary
    - method: `balance()` passed to Summary
- **Summary Component:** displays negative/ positive summation for the `records`
- **Form Component:** add `record` into `records`, updating Table
- **Table Component:** just pass `records` to **TableRow**
- **TableRow Component:** display each `record` in `records`
- **RecordsAPI:** utility providing interface to make RESTful API call

#### 2. File Structure

```
|__node_modules
|
|__public  
|    |___ index.html
|
|__ src
     |___ utils: RecordsAPI.js
     |
     |___ components:
              |___ App.js
              |___ Form.js
              |___ Summary.js
              |___ Table.js
              |___ TableRow.js

```


## III. Ajax request

#### Several Ways:

1. Ajax Libraries
    + Axios
        - axios.get(url[, config])
        - axios.delete(url[, config])
        - axios.head(url[, config])
        - axios.options(url[, config])
        - axios.post(url[, data[, config]])
        - axios.put(url[, data[, config]])
    + jQuery AJAX
2. Browser built-in `window.fetch`

    No need to prepend "window" before `fetch()`: default obj

  ```javascript
  ## No need to prepend "window" before fetch, this is the default obj

    fetch('http://example.com/movies.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });

  ```

