import { type User } from ".";
import { type Setter, type Accessor } from "solid-js";


const UserItem = ({ user, userInfo, setUserInfo, setShowSide }: { user: User, userInfo: Accessor<User>, setUserInfo: Setter<User>, setShowSide: Setter<boolean> }) => {
    const handleClick = (_: any) => {
        // console.log(message.id)
        setUserInfo(user);
        setShowSide(false);
    }

    return (
        <div onClick={handleClick} class={"flex flex-row justify-between text-slate-100 shadow-inner px-5 py-3 transform duration-1000 transition-transform " +
            (userInfo().user === user.user ? 'bg-slate-600' : 'bg-slate-500 bg-opacity-75')}>
            <div><strong>{user.name}</strong></div>
            <div>{user.email}</div>
        </div>
    )
}

export default UserItem