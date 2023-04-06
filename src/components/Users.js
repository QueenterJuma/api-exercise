import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../Store/users/usersSlice";

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  if (isLoading) {
    return (
      <h2>Loading...</h2>
    );
  } else {
    if (error) {
      return (
        <h2>Error Try Again</h2>
      );
    } else {
      return (
        <div>
          <h2>Name</h2>
          {users.map((element, index) => {
            return <li key={index}>
              <div>First:{element.name.first} Last:{element.name.last} </div>
            </li>;
          })}
        </div>
      );
    }
  }

}

export default Users;