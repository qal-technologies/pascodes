'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root
            width={{ md: 'sm' }}
            gap='2'
            p='2'
            borderRadius='12px'
            boxShadow='md'
            className="neon-glow-accent"
            >
            {toast.type === 'loading' ?
              <Spinner
                size='sm'
                color='brandGreen.500'
                speed='0.5s'
                thickness='4px'
                boxSize='20px'
              />
            : <Toast.Indicator />}
            <Stack
              gap='1'
              flex='1'
              maxWidth='100%'>
              {toast.title && (
                <Toast.Title fontWeight='bold'>{toast.title}</Toast.Title>
              )}
              {toast.description && (
                <Toast.Description fontWeight='normal'>
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger fontWeight='normal'>
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
}
