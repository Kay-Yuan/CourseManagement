# Features:
## Teacher management
- Teacher info: list, search and detail
- Teacher : add, delete

## Work Items:
1. Teacher List:
    - Can list all teacher in table
      - **Accept Criteria**
      - I can find (go to different pages to look for it) all teachers I want to see
    - This table is paged with options to change page number and records number on each page
      - **Accept Criteria**
      - There is a controller to change current page number and the corresponding content of that page is displayed
      - There is a controller to change number of records on each page and the correct number is on each page
    - Sort on name
      - **Accept Criteria**
      - Records can be sorted by name for current page
      - [Out of scope]:sorted on all records
    - Filter on country
      - Records can be filterd by country for current page
    - Manipulation on teacher's info
      - Records can be updated/deleted by action in table
    - Teacher detail
      - Linked to the teacher detail page

2. Teacher searching:
   - I can search teacher by name
     - The table will show the result whose name includes searching text 
     - The page number will be updated as well
3. Teacher add:
    - I can add a new teacher to the server and the table will display the new teacher
      - There is a input window to fill in new teacher info

1.1:
1. Call api to get teacher info
   1. Get token(aunthentication/authorization)
   2. Call API
      1. Url path
      2. Data model
   3. For successful response: show list info(may need data transformation)
      1. data transformation
         1. skill: flat from list to concated string
   4. For error reponse: handle(log in console)


## Course Management
- Course info: list and detail
- Course : Add, edit

## Work Items:
1. Course list:
   1. I can find all courses in one page
   2. Each course has a info card with detail(start time/Duration/Teacher/Student limit) and more detail link