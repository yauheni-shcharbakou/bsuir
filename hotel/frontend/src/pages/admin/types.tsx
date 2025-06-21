import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import { Title } from '../../constants/enums';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { optionRepository, typeRepository } from '../../repositories';
import { TypesPageProps } from '../../abstractions/props';
import { useType } from '../../hooks';
import { CenteredHeader } from '../../components/styled/typography';
import TypeForm from '../../components/forms/TypeForm';
import { CenteredContainer } from '../../components/styled/containers';
import { DefaultStack } from '../../components/styled/stacks';
import { TypePopulated } from '../../abstractions/models';
import TypeCard from '../../components/cards/TypeCard';
import AuthWrapper from '../../components/AuthWrapper';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const [initialTypes, initialOptions] = await Promise.all([
    typeRepository.getAll(),
    optionRepository.getAll(),
  ]);
  return { props: { initialTypes, initialOptions } };
};

const Types: NextPage<TypesPageProps> = ({ initialTypes, initialOptions }) => {
  const {
    types,
    name,
    price,
    places,
    checkedOptions,
    isEdit,
    isSubmitBlocked,
    changeNameHandler,
    changePriceHandler,
    changePlacesHandler,
    changeOptionsHandler,
    submitTypeHandler,
    pickTypeHandler,
    deleteTypeHandler,
  } = useType(initialTypes);

  return (
    <AuthWrapper>
      <Layout title={Title.TYPES}>
        <CenteredContainer>
          <CenteredHeader>Types</CenteredHeader>
          <TypeForm
            name={name}
            price={price}
            places={places}
            checkedOptions={checkedOptions}
            options={initialOptions}
            isEdit={isEdit}
            isSubmitDisabled={isSubmitBlocked}
            onChangeName={changeNameHandler}
            onChangePrice={changePriceHandler}
            onChangePlaces={changePlacesHandler}
            onChangeOptions={changeOptionsHandler}
            onSubmit={submitTypeHandler}
          />
          <DefaultStack>
            {types.length ? (
              types.map((type: TypePopulated) => (
                <TypeCard
                  key={type.id.toString(2)}
                  type={type}
                  onPick={pickTypeHandler}
                  onDelete={deleteTypeHandler}
                />
              ))
            ) : (
              <CenteredHeader variant="h6">No types</CenteredHeader>
            )}
          </DefaultStack>
        </CenteredContainer>
      </Layout>
    </AuthWrapper>
  );
};

export default Types;
