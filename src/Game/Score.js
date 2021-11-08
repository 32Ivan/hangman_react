import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Score.css";
import { Link } from "react-router-dom";

function Score() {
  const [score, setScore] = useState([]);

  useEffect(() => {
  const api = `https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores`;
  // dohvacanje API podataka
  async function fetchScore() {
    try {
      const request = await axios({ method: "get", url: api });
      setScore(request.data);
    } catch (error) {
      console.log(error);
    }
  }

      fetchScore();

  } ,[]);

  return (
    <Fragment>
      <div className="bf">
        <Link
          to="/game"
          className="link1"
          style={{ textDecoration: "inherit" }}
        >
          Back
        </Link>
      </div>
      <div className="tablemain">
        <h1 className='h1table'>High Score Table</h1>
        <table>
          <thead className="thead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Duration</th>
              <th scope="col">Errors</th>
              <th scope="col">Id</th>
              <th scope="col">Length</th>
              <th scope="col">Quote Id</th>
              <th scope="col">Unique Characters</th>
              <th scope="col">User Name</th>
            </tr>
          </thead>

          {score.map((item, i) => {

              //mapirenje dohvacenih podataka i  pregled broja errora
            score.sort( function( a , b){
                if(a.errors > b.errors) return 1;
                if(a.errors < b.errors) return -1;
                return 0;
            });

            return (
              <tbody key={i} className="students">
                <tr>
                  <th scope="col">{i}</th>
                  <th className="wordwrap" scope="col">
                    {item.duration}
                  </th>

                  <th className="wordwrap" scope="col">
                    {item.errors}
                  </th>

                  <th className="wordwrap" scope="col">
                    {item.id}
                  </th>

                  <th className="wordwrap" scope="col">
                    {item.length}
                  </th>

                  <th className="wordwrap" scope="col">
                    {item.quoteId}
                  </th>

                  <th className="wordwrap" scope="col">
                    {item.uniqueCharacters}
                  </th>

                  <th className="wordwrap" scope="col">
                    {item.userName}
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </Fragment>
  );
}

export default Score;
