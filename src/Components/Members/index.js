import { useEffect, useState } from 'react';
import styles from './members.module.css';
import TableMember from './TableMember';
import { ToastError } from '../Shared';

function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  const [memberEdited, setMemberEdited] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthday: '',
    phone: '',
    email: '',
    city: '',
    postalCode: '',
    isActive: '',
    membership: ''
  });
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const getMembers = async () => {
    try {
      const reponse = await fetch(`${process.env.REACT_APP_API_URL}/member`);
      const data = await reponse.json();
      setMembers(data.data);
    } catch (error) {
      setToastErroOpen(true);
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);

  const memberEditedId = (id) => {
    const findMember = members.find((i) => i._id === id);
    setMemberEdited({
      firstName: findMember.firstName,
      lastName: findMember.lastName,
      phone: findMember.phone,
      email: findMember.email,
      city: findMember.city,
      dni: findMember.dni,
      password: findMember.password,
      membership: findMember.membership,
      postalCode: findMember.postalCode,
      birthday: findMember.birthday
    });
  };

  const updateMember = async (id, memberUpdated) => {
    let memberToUpdateIndex = members.findIndex((member) => member._id === id);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(memberUpdated)
      });

      const { error } = await response.json();
      if (!error) {
        const currentsMembers = [...members];
        currentsMembers[memberToUpdateIndex] = memberUpdated;
        setMembers(currentsMembers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memberDelete = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/${memberId}`, {
        method: 'DELETE'
      });
      console.log(response);
      setMembers([...members.filter((member) => member._id !== memberId)]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setShowForm((current) => !current);
    setEditForm(false);
  };

  const handleEditToggle = () => {
    setEditForm((current) => !current);
    setShowForm(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.letterColour}>Members</h2>
        <div className={styles.addContainer} onClick={handleToggle}>
          <img
            className={styles.imgSize}
            src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`}
          />
          <p>Add Member</p>
        </div>
      </div>
      {!members.length ? (
        <p>No active Members</p>
      ) : (
        <TableMember
          onUpdateMember={updateMember}
          members={members}
          onDeleteMember={memberDelete}
          showForm={showForm}
          showEditForm={showEditForm}
          handleEditToggle={handleEditToggle}
          setEditForm={setEditForm}
          setMemberEdited={setMemberEdited}
          memberEditedId={memberEditedId}
          memberEdited={memberEdited}
          setMembers={setMembers}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Members;
