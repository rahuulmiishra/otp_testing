import "./style.css";

function MultiStepForm() {
  return (
    <div className="multi-step-form">
      <form>
        <div>
          <fieldset>
            <legend>Personal Information</legend>

            <div className="control-row">
              <label htmlFor="firstName">FirstName</label>
              <input type="text" id="firstName" />
            </div>

            <div className="control-row">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Contact Information</legend>

            <div className="control-row">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" />
            </div>

            <div className="control-row">
              <label htmlFor="city">City</label>
              <input type="text" id="city" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Financial Information</legend>

            <div className="control-row">
              <label htmlFor="salary">Salary</label>
              <input type="text" id="salary" />
            </div>

            <div className="control-row">
              <label htmlFor="bank">Bank</label>
              <input type="text" id="bank" />
            </div>
          </fieldset>
        </div>

        <div>
          <button className="">Cancel</button>
          <button className="success">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;
