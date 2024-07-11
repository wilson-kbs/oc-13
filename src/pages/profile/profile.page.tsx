import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "src/app/services/profile.ts";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./profile.module.scss";

type UpdateProfileInputs = {
  firstName: string;
  lastName: string;
};

function ProfilePage() {
  const { data } = useGetProfileQuery();

  const [isEditing, setIsEditing] = useState(false);

  const onEditName = () => {
    setIsEditing(true);
  };

  const UpdateUserNames = () => {
    const {
      register,
      handleSubmit,
      formState: { errors: formErrors },
    } = useForm<UpdateProfileInputs>();

    const [updateProfile, { error: updateError }] = useUpdateProfileMutation();

    useEffect(() => {
      if (updateError) {
        console.error("Failed to update profile", updateError);
      }
    }, [updateError]);

    const onSaveEditName: SubmitHandler<UpdateProfileInputs> = async (data) => {
      try {
        await updateProfile(data).unwrap();
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile", error);
      }
    };

    const onCancelEditName = () => {
      setIsEditing(false);
    };

    const formatError = (error: typeof updateError) => {
      if (!error) {
        return null;
      }

      if (typeof error === "string") {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return "An error occurred";
    };

    return (
      <form className={styles.Form} onSubmit={handleSubmit(onSaveEditName)}>
        <div>
          <input
            className={styles.Form__input}
            type="text"
            id="firstName"
            {...register("firstName", { required: "firstName is required" })}
            placeholder={data?.firstName || ""}
          />
          {formErrors.firstName && <span>{formErrors.firstName.message}</span>}
        </div>

        <div>
          <input
            className={styles.Form__input}
            type="text"
            id="lastName"
            {...register("lastName", { required: "lastName is required" })}
            placeholder={data?.lastName || ""}
          />
          {formErrors.lastName && <span>{formErrors.lastName.message}</span>}
        </div>
        <button className={styles.Form__btn} onClick={onEditName}>
          Save
        </button>
        <button className={styles.Form__btn} onClick={onCancelEditName}>
          Cancel
        </button>
        {updateError && <span>{formatError(updateError)}</span>}
      </form>
    );
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {data && !isEditing && (
            <>
              {data.firstName} {data.lastName}!
            </>
          )}
        </h1>
        {isEditing ? (
          <UpdateUserNames />
        ) : (
          <button className="edit-button" onClick={onEditName}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
