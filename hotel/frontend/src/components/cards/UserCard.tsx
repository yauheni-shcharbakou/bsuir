import { FC } from 'react';
import { UserCardProps } from '../../abstractions/props';
import { DefaultPaper } from '../styled/papers';
import { PrimaryText } from '../styled/typography';
import { DefaultStack } from '../styled/stacks';
import { Divider, Typography } from '@mui/material';
import { CenteredBox, SpaceBetweenBox } from '../styled/boxes';
import { DefaultButton, OutlinedButton } from '../styled/buttons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from 'mobx-react-lite';

const UserCard: FC<UserCardProps> = ({ user, selfEmail, onPick, onChangeRole, onDelete }) => {
  const isSelf: boolean = selfEmail === user.email;

  return (
    <DefaultPaper>
      <SpaceBetweenBox>
        <DefaultStack>
          <PrimaryText>E-mail: {user.email}</PrimaryText>
          <Typography>Role: {user.role}</Typography>
          <Typography>Status: {user.isActive ? 'active' : 'banned'}</Typography>
        </DefaultStack>
        <CenteredBox>
          <DefaultButton fullWidth color="warning" onClick={() => onPick(user)}>
            <EditIcon />
          </DefaultButton>
          <DefaultButton
            fullWidth
            color="error"
            onClick={() => onDelete(user.id)}
            disabled={isSelf}
          >
            <DeleteOutlineOutlinedIcon />
          </DefaultButton>
        </CenteredBox>
      </SpaceBetweenBox>
      <Divider />
      <DefaultStack>
        <CenteredBox>
          <OutlinedButton fullWidth primary onClick={() => onChangeRole(user)} disabled={isSelf}>
            Change role
          </OutlinedButton>
          <OutlinedButton fullWidth primary disabled={isSelf}>
            Ban
          </OutlinedButton>
        </CenteredBox>
      </DefaultStack>
    </DefaultPaper>
  );
};

export default observer(UserCard);
