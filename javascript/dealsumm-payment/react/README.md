
 ## What does it do
 - **Initialization:**
   - Utilize `get_dataset` to fetch `tenants` from JSON, saving data with React context.
   - Populate the form and enable filter options using the saved data.

 

- **Visualization:**
  - Post-initialization, using `get_series` endpoint to fetch and present `payments` on the chart & total.
  - A switch option allows users to toggle between absolute values and percentages.

 
- **Smart Field Interaction:**
  - Selection of `property_name` or `project_name` dynamically refines other fields, displaying only relevant options.
    (Added a dummy record to the tenants data to illustrate variations and ensure a comprehensive representation of different scenarios.)
  - Press the "Filter" button to dynamically configure the display based on selected criteria.
 
 


 ## How is it built (implementation details)
 I've added the instructions and add my comment -- **with bold**
- **Dashboard Specifications:**
   - Backend should be built in Python, in a framework of your choice. -- **built with django**
    - Backend should read the attached data.json file, and return it to the client via an endpoint called ‘get_dataset’.-- **split for 2 endpoints**
    - Frontend should be built as a React app. -- **built with react ts**
    - The dashboard should have only one visualization component (e.g. graph, chart, table). --  **graph**
    - The visualization component should represent payments over time.-- **show on a graph with an option for tooltip while hovering**
    - The visualization component should let the user see relative payment amounts per tenant (see sample data). -- **There is a switch to show the percentage on the chart**
    - Optional: The user should be able to see the total income for the property over time.-- **There is a total component that makes a sum**
    - Optional: User can filter data by dates, e.g. “from 2023-01-01 until 2023-12-31”.-- **There is an option in filter form**
    - Optional: User can dynamically configure the display of the visualization component.-- **You can do this with legend at graph or filter**
    - Optional: Selecting the client==project_name, property=property_name/all, tenant/all-- **There is an option in filter form**

 ## How to run it
 ### `npm install`
dependencies specified in the package.json file. When you run npm install in your project's root directory, npm (Node Package Manager) reads the dependencies listed in package.json and installs the corresponding packages locally. This ensures that your project has all the required dependencies for proper functioning.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
 
