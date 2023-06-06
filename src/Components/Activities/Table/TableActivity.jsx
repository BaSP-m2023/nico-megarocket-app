// import style from './tableActivity.module.css';
// import { useState } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { ModalSuccess, ModalConfirm, Loader } from '../../Shared';
// import { AddButton } from '../../Shared/index';

// const TableActivity = ({ activity, deleteActivity, loading }) => {
//   const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
//   const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
//   const [getId, setGetId] = useState('');

//   const handleEdit = (act) => {
//     history.push(`activities/form/${act._id}`, { params: act });
//   };

//   const confirmDelete = () => {
//     setModalConfirmOpen(true);
//   };

//   const deleted = () => {
//     deleteActivity(getId);
//     setModalConfirmOpen(false);
//     setModalSuccessOpen(true);
//   };

//   const history = useHistory();

//   return (
//     <section className={style.containerTableActivity}>
//       <>
//         <div className={style.addActivityButton}>
//           <AddButton entity="Acivity" path="activities/formActivities" />
//         </div>
//         <table className={style.containerTable}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Modify</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           {loading ? (
//             <Loader />
//           ) : (
//             <>
//               {activity.length < 1 ? (
//                 <tr>
//                   <td colSpan="4">This list is empty</td>
//                 </tr>
//               ) : (
//                 <tbody className={style.containerEachOneActivity}>
//                   {activity.map((act, index) => (
//                     <tr key={index}>
//                       <td>{act.name}</td>
//                       <td>{act.description}</td>
//                       <td>
//                         <button className={style.iconsTable}>
//                           <img
//                             onClick={() => {
//                               handleEdit(act);
//                             }}
//                             src={`${process.env.PUBLIC_URL}/assets/images/edit.png`}
//                             alt="icon edit"
//                           />
//                         </button>
//                       </td>
//                       <td>
//                         <button
//                           className={style.iconsTable}
//                           onClick={() => {
//                             confirmDelete();
//                             setGetId(act._id);
//                           }}
//                         >
//                           <img
//                             src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
//                             alt="icon trash"
//                           />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               )}
//             </>
//           )}
//         </table>
//         {modalConfirmOpen && (
//           <ModalConfirm
//             method="Delete"
//             onConfirm={() => {
//               deleted();
//             }}
//             message="Are you sure you want to delete this activity?"
//             setModalConfirmOpen={setModalConfirmOpen}
//           />
//         )}
//         {modalSuccessOpen && (
//           <ModalSuccess message="Successfully deleted" setModalSuccessOpen={setModalSuccessOpen} />
//         )}
//       </>
//     </section>
//   );
// };

// export default TableActivity;
