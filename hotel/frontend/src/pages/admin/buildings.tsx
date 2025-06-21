import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import { Title } from '../../constants/enums';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { buildingRepository } from '../../repositories';
import { BuildingsPageProps } from '../../abstractions/props';
import { useBuilding } from '../../hooks';
import { CenteredHeader } from '../../components/styled/typography';
import { DefaultStack } from '../../components/styled/stacks';
import { Building } from '../../abstractions/models';
import { CenteredContainer } from '../../components/styled/containers';
import BuildingCard from '../../components/cards/BuildingCard';
import BuildingForm from '../../components/forms/BuildingForm';
import AuthWrapper from '../../components/AuthWrapper';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initialBuildings = await buildingRepository.getAll();
  return { props: { initialBuildings } };
};

const Buildings: NextPage<BuildingsPageProps> = ({ initialBuildings }) => {
  const {
    buildings,
    address,
    isSubmitBlocked,
    isEdit,
    changeAddressHandler,
    submitBuildingHandler,
    deleteBuildingHandler,
    pickBuildingHandler,
  } = useBuilding(initialBuildings);

  return (
    <AuthWrapper>
      <Layout title={Title.BUILDINGS}>
        <CenteredContainer>
          <CenteredHeader>Buildings</CenteredHeader>
          <BuildingForm
            address={address}
            isEdit={isEdit}
            isSubmitDisabled={isSubmitBlocked}
            onChangeAddress={changeAddressHandler}
            onSubmit={submitBuildingHandler}
          />
          <DefaultStack>
            {buildings.length ? (
              buildings.map((building: Building) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  onPick={pickBuildingHandler}
                  onDelete={deleteBuildingHandler}
                />
              ))
            ) : (
              <CenteredHeader variant="h6">No buildings</CenteredHeader>
            )}
          </DefaultStack>
        </CenteredContainer>
      </Layout>
    </AuthWrapper>
  );
};

export default Buildings;
