import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './produit-commande.reducer';
import { IProduitCommande } from 'app/shared/model/produit-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProduitCommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProduitCommande = (props: IProduitCommandeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { produitCommandeList, match, loading } = props;
  return (
    <div>
      <h2 id="produit-commande-heading">
        Produit Commandes
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Produit Commande
        </Link>
      </h2>
      <div className="table-responsive">
        {produitCommandeList && produitCommandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantite</th>
                <th>Produit</th>
                <th>Commande</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {produitCommandeList.map((produitCommande, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${produitCommande.id}`} color="link" size="sm">
                      {produitCommande.id}
                    </Button>
                  </td>
                  <td>{produitCommande.quantite}</td>
                  <td>
                    {produitCommande.produitId ? <Link to={`produit/${produitCommande.produitId}`}>{produitCommande.produitId}</Link> : ''}
                  </td>
                  <td>
                    {produitCommande.commandeId ? (
                      <Link to={`commande/${produitCommande.commandeId}`}>{produitCommande.commandeId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${produitCommande.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${produitCommande.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${produitCommande.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Produit Commandes found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ produitCommande }: IRootState) => ({
  produitCommandeList: produitCommande.entities,
  loading: produitCommande.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProduitCommande);
