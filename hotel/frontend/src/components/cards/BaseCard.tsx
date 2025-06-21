import { FC } from 'react';
import { BaseCardProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { CenteredBox, SpaceBetweenBox } from '../styled/boxes';
import { DefaultStack } from '../styled/stacks';
import { DefaultButton } from '../styled/buttons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const BaseCard: FC<BaseCardProps> = ({ onPick, onDelete, children }) => {
  return (
    <DefaultPaper>
      <SpaceBetweenBox>
        <DefaultStack>{children}</DefaultStack>
        <CenteredBox>
          <DefaultButton fullWidth color="warning" onClick={onPick}>
            <EditIcon />
          </DefaultButton>
          <DefaultButton fullWidth color="error" onClick={onDelete}>
            <DeleteOutlineOutlinedIcon />
          </DefaultButton>
        </CenteredBox>
      </SpaceBetweenBox>
    </DefaultPaper>
  );
};

export default BaseCard;
