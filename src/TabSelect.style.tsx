import { Checkbox, Popover, styled } from '@mui/material';

export const StyledPopover = styled(Popover)(() => ({}));
StyledPopover.defaultProps = {
	slotProps: {
		paper: {
			sx: { display: 'flex' },
		},
	},
};

export const StyledCheckbox = styled(Checkbox)(() => ({
	marginRight: '6px',
	marginLeft: '-9px',
}));
StyledCheckbox.defaultProps = {
	size: 'small',
	onClick: (e) => e.stopPropagation(),
};
