import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './adresse.reducer';
import { IAdresse } from 'app/shared/model/adresse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdresseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Adresse = (props: IAdresseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { adresseList, match, loading } = props;
  return (
    <div>
      <h2 id="adresse-heading">
        Adresses
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Adresse
        </Link>
      </h2>
      <div className="table-responsive">
        {adresseList && adresseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Numero</th>
                <th>Rue</th>
                <th>Code Postal</th>
                <th>Ville</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adresseList.map((adresse, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${adresse.id}`} color="link" size="sm">
                      {adresse.id}
                    </Button>
                  </td>
                  <td>{adresse.numero}</td>
                  <td>{adresse.rue}</td>
                  <td>{adresse.codePostal}</td>
                  <td>{adresse.ville}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${adresse.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adresse.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adresse.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Adresses found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adresse }: IRootState) => ({
  adresseList: adresse.entities,
  loading: adresse.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Adresse);
