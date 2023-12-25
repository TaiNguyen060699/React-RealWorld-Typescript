import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../../atom";

const FOLLOWED_CLASS = "btn btn-sm action-btn btn-secondary";
const UNFOLLOWED_CLASS = "btn btn-sm action-btn btn-outline-secondary";

interface FollowButtonProps {
  following: boolean;
  username: string;
  follow: () => Promise<void>;
  unfollow: () => Promise<void>;
}

const FollowButton = ({
  following,
  username,
  follow,
  unfollow,
}: FollowButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const navigate = useNavigate();

  const handleClickFollow = async () => {
    if (!isLoggedIn) {
      return navigate("/login");
    }

    setDisabled(true);
    
    try {
      if (following) {
        await unfollow();
      } else {
        await follow();
      }
    } catch (error) {
      console.error("Error while following/unfollowing:", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <button
        className={
          following
            ? `${FOLLOWED_CLASS} ${disabled ? "disabled" : ""}`
            : `${UNFOLLOWED_CLASS} ${disabled ? "disabled" : ""}`
        }
        type="button"
        onClick={handleClickFollow}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {following ? "Unfollow" : "Follow"} {username}
      </button>
    </>
  );
};

export default FollowButton;
