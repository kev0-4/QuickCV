<README>
  <section>
    <title>HR Tech Web Application</title>
    <description>
      This project is an HR Tech web application designed to simplify the hiring process by enabling CV uploads, extracting candidate information using advanced AI, and managing data efficiently.
    </description>
  </section>

  <section>
    <title>Backend Setup</title>
    <steps>
      <step>Navigate to the <code>/backend</code> directory.</step>
      <step>Install the dependencies: <code>pip install -r requirements.txt</code>.</step>
      <step>Run the local server: <code>uvicorn main:app --reload</code>.</step>
    </steps>
    <routes>
      <route>http://127.0.0.1:8000/api/get_details</route>
      <route>http://127.0.0.1:8000/api/upload_cv</route>
      <route>http://127.0.0.1:8000/docs</route>
    </routes>
    <note>The backend is built using <b>FastAPI</b> and <b>Uvicorn</b>.</note>
  </section>

  <section>
    <title>Frontend Setup</title>
    <steps>
      <step>Navigate to the <code>/HRwebapp</code> directory.</step>
      <step>Install the dependencies: <code>npm install</code>.</step>
      <step>Start the development server: <code>npm run dev</code>.</step>
    </steps>
  </section>

  <section>
    <title>Database</title>
    <description>
      CVs are stored in Cloudflare R2 object storage. Candidate details are stored as an Excel file (<code>.xlsx</code>) in R2.
    </description>
  </section>

  <section>
    <title>Frontend Technology</title>
    <description>The frontend is built using Vite and React (JavaScript).</description>
  </section>
</README>
