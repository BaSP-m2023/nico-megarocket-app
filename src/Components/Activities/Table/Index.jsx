// import { useState, useEffect } from 'react';
// import TableActivity from './TableActivity';
// import style from './tableActivity.module.css';
// import { ToastError } from '../../Shared';

// const ActivitiesTable = () => {
//   const [activity, setActivity] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [toastErroOpen, setToastErroOpen] = useState(false);

//   const getActivity = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/activity`);
//       const activities = await res.json();
//       setActivity(activities.data);
//       setLoading(false);
//     } catch (error) {
//       setToastErroOpen(true);
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const waitActivities = async () => {
//       setLoading(true);
//       await getActivity();
//     };
//     waitActivities();
//   }, []);

//   const deleteActivityDB = async (id) => {
//     try {
//       await fetch(`${process.env.REACT_APP_API_URL}/activity/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteActivity = async (id) => {
//     await deleteActivityDB(id);
//     setActivity([...activity.filter((act) => act._id !== id)]);
//   };

//   return (
//     <section className={style.containerTables}>
//       <TableActivity
//         activity={activity}
//         setActivity={setActivity}
//         deleteActivity={deleteActivity}
//         loading={loading}
//       />
//       {toastErroOpen && (
//         <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
//       )}
//     </section>
//   );
// };

// export default ActivitiesTable;
