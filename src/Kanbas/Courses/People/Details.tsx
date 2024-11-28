import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck,FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";

export default function PeopleDetails() {

  const { uid} = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);

  const saveUser = async () => {
    if (isEditingName == true) {
      const [firstName, lastName] = name.split(" ");
      const updatedUser = { ...user, firstName, lastName };
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setIsEditingName(false);
    } else if (isEditingEmail == true) {
        const updatedUser = { ...user, email };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setIsEditingEmail(false);
    } else if (isEditingRole == true) {
        const updatedUser = { ...user, role };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setIsEditingRole(false);
    } else {
        const updatedUser = null;
        setUser(updatedUser);
    }
    navigate(-1);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div> <hr />
      <div className="text-danger fs-4 wd-name"> {user.firstName} {user.lastName} </div>
      <b>Roles:</b>           <span className="wd-roles">         {user.role}         </span> <br />
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> <hr />

      <div className="text-danger fs-4">
        {!isEditingName && (
          <FaPencil onClick={() => setIsEditingName(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {isEditingName && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!isEditingName && (
          <div className="wd-name"
              onClick={() => setIsEditingName(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && isEditingName && (
          <input className="form-control w-50 wd-edit-name"
            placeholder={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>

      <div className="text-danger fs-4">
        {!isEditingEmail && (
          <FaPencil onClick={() => setIsEditingEmail(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {isEditingEmail && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!isEditingEmail && (
          <div className="wd-email"
              onClick={() => setIsEditingEmail(true)}>
            {user.email}</div>)}
        {user && isEditingEmail && (
          <input type="email" className="form-control w-50 wd-edit-email"
            placeholder={`${user.email}` || "email address"}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)} 
      </div>

      <div className="text-danger fs-4">
        {!isEditingRole && (
          <FaPencil onClick={() => setIsEditingRole(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {isEditingRole && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!isEditingRole && (
          <div className="wd-role"
              onClick={() => setIsEditingRole(true)}>
            {user.role}</div>)}
        {user && isEditingRole && (
          <select className="form-select float-start w-25 wd-select-role" 
                  value={role} onChange={(e) =>setRole(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { saveUser(); }}}>
            <option value="">All Roles</option>    <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>)}
      </div> <br /><br /> <hr />

      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)} className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
    </div> 
  ); 
}