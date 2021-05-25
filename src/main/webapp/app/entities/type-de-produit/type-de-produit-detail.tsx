import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './type-de-produit.reducer';
import { ITypeDeProduit } from 'app/shared/model/type-de-produit.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITypeDeProduitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeDeProduitDetail = (props: ITypeDeProduitDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { typeDeProduitEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          TypeDeProduit [<b>{typeDeProduitEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{typeDeProduitEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/type-de-produit" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type-de-produit/${typeDeProduitEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ typeDeProduit }: IRootState) => ({
  typeDeProduitEntity: typeDeProduit.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeDeProduitDetail);
