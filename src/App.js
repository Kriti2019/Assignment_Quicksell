import React, { useEffect, useState } from 'react';
import toDoIcon from "./static/To-do.svg"
import noPriority from "./static/No-priority.svg"
import lowPriority from "./static/Img - Low Priority.svg"
import mediumPriority from "./static/Img - Medium Priority.svg"
import highPriority from "./static/Img - High Priority.svg"
import urgentPriority from "./static/SVG - Urgent Priority colour.svg"
import inProgress from "./static/in-progress.svg"
import done from "./static/Done.svg"
import cancelled from "./static/Cancelled.svg"
import backlog from "./static/Backlog.svg"
import dotMenu from "./static/3 dot menu.svg"
import filter from "./static/Display.svg"
import downArrow from "./static/down.svg"
import addIcon from "./static/add.svg"

const App = () => {
  const [showNav, setShowNav] = useState(false)
  const [groupBy, setGroupBy] = useState(localStorage.getItem("group") ?? "Status")
  const [orderBy, setOrderBy] = useState(localStorage.getItem("order") ?? "Priority")
  const [groupingLevel, setGroupingLevel] = useState([]);
  const [data, setDate] = useState([]);

  // const data = {
  //   "tickets": [
  //     {
  //       "id": "CAM-1",
  //       "title": "Update User Profile Page UI",
  //       "tag": [
  //         "Feature request"
  //       ],
  //       "userId": "usr-1",
  //       "status": "Todo",
  //       "priority": 4
  //     },
  //     {
  //       "id": "CAM-2",
  //       "title": "Add Multi-Language Support - Enable multi-language support within the application.",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-2",
  //       "status": "In progress",
  //       "priority": 3
  //     },
  //     {
  //       "id": "CAM-3",
  //       "title": "Optimize Database Queries for Performance",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-2",
  //       "status": "In progress",
  //       "priority": 1
  //     },
  //     {
  //       "id": "CAM-4",
  //       "title": "Implement Email Notification System",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-1",
  //       "status": "In progress",
  //       "priority": 3
  //     },
  //     {
  //       "id": "CAM-5",
  //       "title": "Enhance Search Functionality",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-5",
  //       "status": "In progress",
  //       "priority": 0
  //     },
  //     {
  //       "id": "CAM-6",
  //       "title": "Third-Party Payment Gateway",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-2",
  //       "status": "Todo",
  //       "priority": 1
  //     },
  //     {
  //       "id": "CAM-7",
  //       "title": "Create Onboarding Tutorial for New Users",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-1",
  //       "status": "Backlog",
  //       "priority": 2
  //     },
  //     {
  //       "id": "CAM-8",
  //       "title": "Implement Role-Based Access Control (RBAC)",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-3",
  //       "status": "In progress",
  //       "priority": 3
  //     },
  //     {
  //       "id": "CAM-9",
  //       "title": "Upgrade Server Infrastructure",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-5",
  //       "status": "Todo",
  //       "priority": 2
  //     },
  //     {
  //       "id": "CAM-10",
  //       "title": "Conduct Security Vulnerability Assessment",
  //       "tag": [
  //         "Feature Request"
  //       ],
  //       "userId": "usr-4",
  //       "status": "Backlog",
  //       "priority": 1
  //     }
  //   ],
  //   "users": [
  //     {
  //       "id": "usr-1",
  //       "name": "Anoop sharma",
  //       "available": false
  //     },
  //     {
  //       "id": "usr-2",
  //       "name": "Yogesh",
  //       "available": true
  //     },
  //     {
  //       "id": "usr-3",
  //       "name": "Shankar Kumar",
  //       "available": true
  //     },
  //     {
  //       "id": "usr-4",
  //       "name": "Ramesh",
  //       "available": true
  //     },
  //     {
  //       "id": "usr-5",
  //       "name": "Suresh",
  //       "available": true
  //     }
  //   ]
  // }

  const statuses = [{
    id: "Backlog",
    title: "Backlog",
    icon: backlog
  }, {
    id: "Todo",
    title: "Todo",
    icon: toDoIcon
  }, {
    id: "In progress",
    title: "In Progress",
    icon: inProgress
  }, {
    id: "Done",
    title: "Done",
    icon: done
  }, {
    id: "Cancelled",
    title: "Cancelled",
    icon: cancelled
  }]
  const priorities = [{
    id: 0,
    title: "No priority",
    icon: noPriority
  }, {
    id: 4,
    title: "Urgent",
    icon: urgentPriority
  }, {
    id: 3,
    title: "High",
    icon: highPriority
  }, {
    id: 2,
    title: "Medium",
    icon: mediumPriority
  }, {
    id: 1,
    title: "Low",
    icon: lowPriority
  },]


  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment").then(async data=>{setDate( await data.json())})
    if (groupBy == "Priority") {
      setGroupingLevel(priorities)
    } else if (groupBy == "Status") {
      setGroupingLevel(statuses)
    } else if (groupBy == "User") {
      setGroupingLevel(data.users)
    }
  }, [groupBy, orderBy]);



  const getDataByGrouping = (id, group) => {
    const tickets = data.tickets
    return tickets?.filter(i => (groupBy === "Priority" ? i.priority : groupBy === "Status" ? i.status : i.userId) === id).sort((a, b) => {
      if (group == "Priority") {
        if (a.priority < b.priority) return -1
        return a.priority > b.priority ? 1 : 0
      }
      if (group == "Title") {
        if (a.title < b.title) return -1
        return a.title > b.title ? 1 : 0
      }
    })

  }
  const getUserDetails = (id) => {
    return data.users?.filter(i => i.id === id)
  }
  const getNameAb = (id) => {
    const users = data.users?.filter(i => i.id === id)
    return users[0].name.match(/(\b\S)?/g).join("").toUpperCase()
  }
  const geticonByStatus = (status) => {
    const selectedStatus = statuses.filter(i => i.id === status)
    return selectedStatus[0].icon
  }
  const geticonByPriority = (priority) => {
    const selectedPriority = priorities.filter(i => i.id === priority)
    return selectedPriority[0].icon
  }


  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center" }}>
      {/* navbar */}
      <div style={{ padding: "20px", zIndex: 10, width: "100%", height: "8vh", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
        <button style={{ position: "fixed", left: "20px", display: "flex", alignItems: "center", background: "white", borderRadius: "4px" }} onClick={() => setShowNav(!showNav)}><img src={filter} /> Display <img src={downArrow} /></button>
        <div style={{ display: showNav ? "flex" : "none", position: "relative", top: "70px", left: "20px", flexDirection: "column", width: "200px", padding: "10px", backgroundColor: "white", borderRadius: "12px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "10px" }}>
            <h6 style={{ margin: 0 }}>Grouping</h6>
            <select onChange={(e) => { setGroupBy(e.target.value); localStorage.setItem("group", e.target.value); }} defaultValue={groupBy}>
              <option value={"Status"}>Status</option>
              <option value={"User"}>User</option>
              <option value={"Priority"}>Priority</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "10px" }}>
            <h6 style={{ margin: 0 }}>Ordering</h6>
            <select onChange={(e) => { setOrderBy(e.target.value); localStorage.setItem("order", e.target.value); }} defaultValue={orderBy}>
              <option value={"Priority"}>Priority</option>
              <option value={"Title"}>Title</option>
            </select>
          </div>
        </div>
      </div>
      {/* body */}
      <div onClick={() => setShowNav(false)} style={{ height: "90vh", overflowY: "scroll", padding: "10px", backgroundColor: "#f3f9ff" }}>
        <div style={{ width: "100vw", display: "grid", paddingLeft: "50px", justifyContent: "space-evenly", gridTemplateColumns: "20vw 20vw 20vw 20vw 20vw", gap: "30px" }}>
          {groupingLevel.map(eachPriority => (
            <div style={{ display: "flex", flexDirection: "column", }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex",}}>
                  {groupBy == "User" ? <div style={{ display: "flex", margin: 0, }}>
                    <h6 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20px", width: "20px", padding: "3px", flexDirection: "row", border: "1px solid #DEDEDE", borderRadius: "50%" }}>
                      {getNameAb(eachPriority.id)}
                    </h6>
                    <div style={{ position: "relative", bottom: "-46px", left: "-5px", borderRadius: "50%", backgroundColor: getUserDetails(eachPriority.id)[0]?.available === true ? "green" : "grey", height: "8px", width: "8px" }}></div>
                  </div> : <img src={eachPriority.icon} style={{ marginRight: "5px" }} />}
                  <h6>{eachPriority.title ?? eachPriority.name}</h6>
                </div>
                <div>
                  <img style={{padding:"7px"}} src={addIcon} />
                  <img style={{padding:"7px"}} src={dotMenu} />
                </div>
              </div>
              {getDataByGrouping(eachPriority.id, orderBy)?.map(task => (
                <div style={{ backgroundColor: "white", margin: "5px", padding: "15px", display: "flex", flexDirection: "column", border: "1px solid #ebebeb", borderRadius: "12px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                  <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                    <h5 style={{ margin: 0, color: "#7e7e7e" }}>{task.id}</h5>
                    <div style={{ display: "flex", margin: 0 }}>
                      <h6 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20px", width: "20px", padding: "3px", flexDirection: "row", border: "1px solid #DEDEDE", borderRadius: "50%" }}>
                        {getNameAb(task.userId)}
                      </h6>
                      <div style={{ position: "relative", bottom: "-46px", left: "-5px", borderRadius: "50%", backgroundColor: getUserDetails(task.userId)[0]?.available === true ? "green" : "grey", height: "8px", width: "8px" }}></div>
                    </div>
                  </div>
                  <h5 style={{ margin: 0, paddingTop: "5px", paddingRight: "5px" }}><img src={geticonByStatus(task.status)} style={{ paddingRight: "5px", display: groupBy === "Status" ? "none" : "" }} /> {task.title}</h5>
                  <div style={{ marginTop: "5px", display: "flex", }}>
                    <img src={geticonByPriority(task.priority)} style={{ paddingRight: "5px", display: groupBy === "Priority" ? "none" : "" }} />
                    {task.tag?.map(tag => (
                      <h6 style={{ padding: "5px", width: "auto", border: "1px solid #DEDEDE", borderRadius: "5px", margin: "5px", display: "flex", alignItems: "center" }}>
                        <div style={{ borderRadius: "50%", marginRight: "4px", backgroundColor: "gray", height: "8px", width: "8px" }}></div>
                        {tag}
                      </h6>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;