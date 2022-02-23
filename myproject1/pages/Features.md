# Features:

## Overview
- Overview for managers
- Overview for teachers
- Overview for students

1. Manager Overview
   1. Can show summary of students, teachers, courses
   2. Can show distribution of students and teachers
   3. Can show type of students and teachers and courses
   4. Can show increment and languages.
   5. Can show course schedule per weekday
2. Teacher Overview
3. Student Overview


## Course Management
- Course info: list and detail
- Course : Add, edit

## Work Items:
1. Course list:
   1. Can list courses as cards
      1. I can find all courses in one page
      2. I can scroll down to load more data when I want
      3. Each course has a info card with detail(start time/Duration/Teacher/Student limit)
   2. Link to detail
      1. Each course has a link button for more detail 
2. Course detail:
   1. Can show the all details of a course
      1. There are two columns to show the detail of course(...), left is a card with more detail; right will show other detail(...)
3. Add course:
   1. Can collect info of a new course from input
   2. Can add the new course to database
4. Edit/update course:
   1. Can show and edit existing course detail
   2. Can update the change


## Mind map 
1. Course list:
   0. Set up page UI:
      1. <DashBoard> <Breadcrumb> <List>
   
   1. Call API and implement antd relevant compounents 
      1. Call API to get the first 20 courses info
      2. Add <InfiniteScroll> for scroll down to load more data
      3. Implement <Card> into <CourseCard>, set the appropriate properties
   2. Add button link to detail page ([id].tsx )

2. Course Detail:
   1. Call API and extend <CourseCard> by <Card.Grid> to display price etc
3. Add Course:
   1. Implement <Steps> <Form> to the Add Course page
      1. Apply property layout for the form items and each step
   2. Submit form via call API to the server at the final step
4. Edit/update course:
   1. implement <InputGroup>
      




## Teacher management
- Teacher info: list, search and detail
- Teacher : add, delete

## Work Items:
1. Teacher List:
    - Can list all teacher in table
      - **Acceptance Criteria**
      - I can find (go to different pages to look for it) all teachers I want to see
    - This table is paged with options to change page number and records number on each page
      - **Acceptance Criteria**
      - There is a controller to change current page number and the corresponding content of that page is displayed
      - There is a controller to change number of records on each page and the correct number is on each page
    - Sort on name
      - **Acceptance Criteria**
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


