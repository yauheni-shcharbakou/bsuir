import { FC } from 'react';
import { TypeFormProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { DefaultStack } from '../styled/stacks';
import { Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import { ContainedButton } from '../styled/buttons';
import { Option } from '../../abstractions/models';
import { CenteredHeader } from '../styled/typography';

const TypeForm: FC<TypeFormProps> = ({
  name,
  price,
  places,
  checkedOptions,
  options,
  isEdit,
  isSubmitDisabled,
  onChangeName,
  onChangePrice,
  onChangePlaces,
  onChangeOptions,
  onSubmit,
}) => {
  return (
    <DefaultPaper>
      <DefaultStack>
        <TextField
          autoComplete="off"
          label="Name"
          value={name}
          type="text"
          onChange={onChangeName}
        />
        <TextField
          autoComplete="off"
          label="Price"
          value={price}
          type="text"
          onChange={onChangePrice}
        />
        <TextField
          autoComplete="off"
          label="Places"
          value={places}
          type="text"
          onChange={onChangePlaces}
        />
        <Grid item md={6}>
          <FormGroup>
            {options.length ? (
              options.map((option: Option) => (
                <FormControlLabel
                  control={<Checkbox />}
                  key={option.id.toString(2)}
                  label={option.name}
                  checked={checkedOptions.includes(option.id)}
                  onChange={(_, checked) => onChangeOptions(option.id, checked)}
                />
              ))
            ) : (
              <CenteredHeader variant="h6">No available options</CenteredHeader>
            )}
          </FormGroup>
        </Grid>
        <ContainedButton primary onClick={onSubmit} disabled={isSubmitDisabled}>
          {isEdit ? 'Change ' : 'Create '} type
        </ContainedButton>
      </DefaultStack>
    </DefaultPaper>
  );
};

export default TypeForm;
