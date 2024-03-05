import { type User } from ".";
import { type Setter, type Accessor } from "solid-js";


const UserItem = ({ user, userInfo, setUserInfo, setshowSide }: { user: User, userInfo: Accessor<User>, setUserInfo: Setter<User>, setshowSide: Setter<boolean> }) => {
    const handleClick = (_: any) => {
        // console.log(message.id)
        setUserInfo(user);
        setshowSide(false);
    }

    return (
        <div onClick={handleClick} class={"flex flex-row justify-between text-slate-100 shadow-inner px-5 py-3 transform duration-1000 transition-transform " +
            (userInfo().user === user.user ? 'bg-slate-600' : 'bg-slate-400 bg-opacity-75')}>
            <div><strong>{user.name}</strong></div>
            <div>{user.email}</div>
        </div>
    )
}

export default UserItem