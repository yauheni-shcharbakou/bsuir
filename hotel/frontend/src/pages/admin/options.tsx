import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import { Title } from '../../constants/enums';
import { useOption } from '../../hooks';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { optionRepository } from '../../repositories';
import { OptionsPageProps } from '../../abstractions/props';
import OptionForm from '../../components/forms/OptionForm';
import { CenteredHeader } from '../../components/styled/typography';
import { CenteredContainer } from '../../components/styled/containers';
import { DefaultStack } from '../../components/styled/stacks';
import { Option } from '../../abstractions/models';
import OptionCard from '../../components/cards/OptionCard';
import AuthWrapper from '../../components/AuthWrapper';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initialOptions = await optionRepository.getAll();
  return { props: { initialOptions } };
};

const Options: NextPage<OptionsPageProps> = ({ initialOptions }) => {
  const {
    name,
    price,
    options,
    isSubmitBlocked,
    isEdit,
    submitOptionHandler,
    pickOptionHandler,
    changePriceHandler,
    changeNameHandler,
    deleteOptionHandler,
  } = useOption(initialOptions);

  return (
    <AuthWrapper>
      <Layout title={Title.OPTIONS}>
        <CenteredContainer>
          <CenteredHeader>Options</CenteredHeader>
          <OptionForm
            name={name}
            price={price}
            isEdit={isEdit}
            isSubmitDisabled={isSubmitBlocked}
            onChangeName={changeNameHandler}
            onChangePrice={changePriceHandler}
            onSubmit={submitOptionHandler}
          />
          <DefaultStack>
            {options.length ? (
              options.map((option: Option) => (
                <OptionCard
                  key={option.id}
                  option={option}
                  onPick={pickOptionHandler}
                  onDelete={deleteOptionHandler}
                />
              ))
            ) : (
              <CenteredHeader variant="h6">No options</CenteredHeader>
            )}
          </DefaultStack>
        </CenteredContainer>
      </Layout>
    </AuthWrapper>
  );
};

export default Options;
