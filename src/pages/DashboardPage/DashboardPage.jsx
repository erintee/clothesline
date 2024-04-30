import { useEffect, useState } from "react";
import "./DashboardPage.scss";
import { BASE_URL } from "../../utils/utils";
import axios from "axios";

const DashboardPage = ({ user }) => {
    console.log(user);
    return (
        <div className="dashboard">
            <h1 className="dashboard__greeting">Hey, {user.firstName}!</h1>
            <section className="actions">
                <div className="actions__explore">Link to "Explore" page</div>
                <div className="actions__my-closet">Link to "My Closet" page</div>
            </section>
        </div>
    )
}

export default DashboardPage