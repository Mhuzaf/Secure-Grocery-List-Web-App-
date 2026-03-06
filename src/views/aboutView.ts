import { company } from "../app/defaults.ts";

export const aboutView = () => {
    return `
    <section id="aboutRoot">

        <section id="aboutHeader">
            <h1>About ${company}</h1>
            <p class="aboutDesc">
                ${company} is a simple web application that helps users organize their grocery shopping.
                Instead of using paper lists that are easy to lose, this system keeps everything in one
                digital place where items, quantities, and categories can be easily managed.
            </p>
        </section>

        <section id="aboutFeatures">

            <div class="aboutCard">
                <h3>Easy List Management</h3>
                <p>
                Add, update, and remove grocery items quickly without complicated tools.
                Everything stays organized in one place.
                </p>
            </div>

            <div class="aboutCard">
                <h3>Quick Search & Filter</h3>
                <p>
                Find items instantly by name or filter them by category to make shopping faster.
                </p>
            </div>

            <div class="aboutCard">
                <h3>Quantity Tracking</h3>
                <p>
                Track how many items you need so you never forget or buy too much.
                </p>
            </div>

            <div class="aboutCard">
                <h3>User Accounts</h3>
                <p>
                Users can create accounts, log in securely, and manage their personal grocery list.
                </p>
            </div>

        </section>


        <section id="aboutHow">

            <h2>How It Works</h2>

            <div class="steps">

                <div class="step">
                    <span class="stepNumber">1</span>
                    <h4>Browse Items</h4>
                    <p>View grocery products stored in the database.</p>
                </div>

                <div class="step">
                    <span class="stepNumber">2</span>
                    <h4>Manage Your List</h4>
                    <p>Add items, update quantities, and remove items easily.</p>
                </div>

                <div class="step">
                    <span class="stepNumber">3</span>
                    <h4>Shop Confidently</h4>
                    <p>Use your organized list while shopping so nothing is forgotten.</p>
                </div>

            </div>

        </section>

    </section>
    `;
};