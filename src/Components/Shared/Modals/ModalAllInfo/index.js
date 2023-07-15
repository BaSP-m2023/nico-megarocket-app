import React from 'react';
import styles from './modalAllInfo.module.css';
import { ButtonForm } from 'Components/Shared';
import { useHistory, useLocation } from 'react-router-dom';

const ModalInfo = ({ data, setModalAllInfo }) => {
  const history = useHistory();
  const located = useLocation().pathname;

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.containerModalInfo}>
        <div className={styles.boxClose}>
          <div
            onClick={() => {
              setModalAllInfo(false);
            }}
            className={styles.closeModal}
          >
            X
          </div>
        </div>
        <div className={styles.classInfo}>
          <h1 className={styles.titleModal}>
            {data?.description ? `${data?.name}` : `${data?.firstName} ${data?.lastName}`}
          </h1>
        </div>
        <div className={styles.otherInfo}>
          {data?.description ? (
            ''
          ) : (
            <p>
              <span className={styles.subTitle}>Email:</span>{' '}
              <span className={styles.dataSubTitle}>{data?.email}</span>
            </p>
          )}
        </div>
        <div className={styles.tableBox}>
          <table className={styles.tableModal}>
            <thead>
              <tr>
                {data.description ? (
                  <>
                    <th>Description</th>
                  </>
                ) : (
                  <>
                    <th>Phone</th>
                    <th>City</th>
                    {!data.membership ? (
                      <>
                        <th>DNI</th>
                        <th>Salary/h</th>
                      </>
                    ) : (
                      <>
                        <th>Membership</th>
                        <th>Postal code</th>
                      </>
                    )}
                  </>
                )}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {data.description ? (
                <>
                  <td>{data?.description}</td>
                </>
              ) : (
                <>
                  <td>{data?.phone}</td>
                  <td>{data?.city}</td>
                </>
              )}
              {!data.membership ? (
                <>
                  <td>{data?.dni}</td>
                  <td>{data?.salary}</td>
                </>
              ) : (
                <>
                  <td>{data?.membership}</td>
                  <td>{data?.postalCode}</td>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.buttonEditBox}>
          <div
            className={styles.editButton}
            title={!data.membership ? 'edit trainer' : 'edit member'}
          >
            <ButtonForm
              nameImg="edit.svg"
              onAction={() => {
                if (located === '/admin/activities') {
                  history.push(`/admin/activities/form/${data._id}`, {
                    params: { ...data, mode: 'edit' }
                  });
                } else {
                  history.push(
                    `/admin/${!data.membership ? 'trainers' : 'members'}/form/${data._id}`,
                    {
                      params: { ...data, mode: 'edit' }
                    }
                  );
                }
              }}
              testId="edit-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
