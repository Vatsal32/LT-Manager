import React from "react";
import PropTypes from "prop-types";
import "./TableDaily.css";
import { useNavigate } from "react-router-dom";

function TableDaily({ data, lectures, date }) {
  const time = [
    { t: "07:00" },
    { t: "07:30" },
    { t: "08:00" },
    { t: "08:30" },
    { t: "09:00" },
    { t: "09:30" },
    { t: "10:00" },
    { t: "10:30" },
    { t: "11:00" },
    { t: "11:30" },
    { t: "12:00" },
    { t: "12:30" },
    { t: "13:00" },
    { t: "13:30" },
    { t: "14:00" },
    { t: "14:30" },
    { t: "15:00" },
    { t: "15:30" },
    { t: "16:00" },
    { t: "16:30" },
    { t: "17:00" },
    { t: "17:30" },
    { t: "18:00" },
    { t: "18:30" },
  ];

  const navigate = useNavigate();

  return (
    <table className="dwm_main refreshable" id="day_main">
      <thead>
        <tr>
          <th className="first_last" style={{ width: "3.846153846%" }}>
            <a>Time</a>
          </th>
          {time.map((val, key) => (
            <th
              key={key}
              className="first_last"
              style={{ width: "3.846153846%" }}
            >
              <a>{val.t}</a>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.keys(data).map((value, key) => {
          return (
            <tr key={key}>
              <th className="new">
                <a>{data[value][0]}</a>
              </th>
              {lectures[key].map((value, key_1) => {
                return (
                  <td
                    key={key_1}
                    className="new"
                    onClick={() => {
                      console.log(value);
                        navigate(`/book/${date}`);
                      }}
                    style={{
                      backgroundColor:
                        value.purpose === null
                          ? "white"
                          : (value.admin1 && value.admin2 && value.admin3) ||
                            value.superAdmin
                          ? "green"
                          : "red",
                    }}
                  >
                    <a>{value.purpose !== "" ? value.purpose : ""}</a>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TableDaily.propTypes = {
  data: PropTypes.object.isRequired,
  lectures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  date: PropTypes.string.isRequired,
};

export default TableDaily;
