import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './produit-commande.reducer';
import { IProduitCommande } from 'app/shared/model/produit-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProduitCommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProduitCommandeDetail = (props: IProduitCommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { produitCommandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ProduitCommande [<b>{produitCommandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">Quantite</span>
          </dt>
          <dd>{produitCommandeEntity.quantite}</dd>
          <dt>Produit</dt>
          <dd>{produitCommandeEntity.produitId ? produitCommandeEntity.produitId : ''}</dd>
          <dt>Commande</dt>
          <dd>{produitCommandeEntity.commandeId ? produitCommandeEntity.commandeId : ''}</dd>
        </dl>
        <Button tag={Link} to="/produit-commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produit-commande/${produitCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ produitCommande }: IRootState) => ({
  produitCommandeEntity: produitCommande.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProduitCommandeDetail);
