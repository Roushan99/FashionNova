import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { NavLink, Link as Links, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const userName = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/'); // Redirect to home or login page after logout
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}>
        
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex align={'center'} mr={{base: '-115px', md:5}}>
          <Box w={{ base: '100px', md: '150px' }} h="auto">
            <Links to='/'>
            <svg viewBox="0 0 249 30" fill="none"  xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M215.627 0.825127H224.903C225.236 0.825127 225.444 1.11254 225.319 1.39996L215.794 28.6C215.71 28.888 215.377 29.1754 215.045 29.1754H205.893C205.56 29.1754 205.227 28.888 205.144 28.6L200.128 14.2785C200.14 14.5177 200.147 14.758 200.147 15.0003C200.147 23.2711 193.334 30 184.961 30C177.325 30 170.991 24.4047 169.933 17.1471V28.6C169.933 28.888 169.683 29.1754 169.309 29.1754H162.113C161.822 29.1754 161.447 28.9702 161.239 28.6412L154.001 15.863V28.6C154.001 28.887 153.753 29.1724 153.381 29.1749H144.698L126.721 3.71131V29.1944H124.909V0.81359H126.721L144.711 26.2541V0.81359H145.594L147.257 0.825127H153.211C153.585 0.825127 154.001 1.03028 154.167 1.35883L161.364 14.137V1.44109C161.364 1.11254 161.655 0.825127 161.946 0.825127H169.309C169.683 0.825127 169.933 1.11254 169.933 1.44109V12.8534C170.991 5.59581 177.325 0 184.961 0C190.07 0 194.594 2.50748 197.349 6.33918L195.619 1.39996C195.494 1.11254 195.701 0.825127 196.034 0.825127H205.311C205.685 0.825127 206.018 1.11254 206.101 1.39996L210.469 18.2872L214.836 1.39996C214.92 1.11254 215.252 0.825127 215.627 0.825127ZM178.295 15.0002C178.295 18.6308 181.285 21.5847 184.961 21.5847C188.636 21.5847 191.627 18.6308 191.627 15.0002C191.627 11.3697 188.636 8.41577 184.961 8.41577C181.285 8.41577 178.295 11.3697 178.295 15.0002ZM232.07 18.4517L234.317 10.6448L236.563 18.4517H232.07ZM239.557 1.35877L248.958 28.6411C249.083 28.8879 248.917 29.1753 248.585 29.1753H240.348C239.973 29.1753 239.64 28.9702 239.474 28.6411L238.227 24.3274H230.406L229.158 28.6411C228.992 28.9702 228.659 29.1753 228.285 29.1753H220.048C219.715 29.1753 219.549 28.8879 219.674 28.6411L229.075 1.35877C229.2 1.11249 229.657 0.825073 230.073 0.825073H238.559C238.975 0.825073 239.433 1.11249 239.557 1.35877Z" fill="black"></path>
              <path d="M1.79662 2.54206H14.0875V0.9375H0V29.0625H1.79662V16.0138H13.5977V14.4087H1.79662V2.54206Z" fill="black"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M52.8954 14.1733C53.8499 14.6934 54.7214 15.2967 55.5098 15.9844C56.2982 16.673 56.9479 17.4653 57.4603 18.3641C57.9723 19.263 58.2283 20.316 58.2283 21.5232C58.2283 22.6184 58.0133 23.6288 57.5849 24.5554C57.156 25.482 56.5537 26.2827 55.7794 26.9564C55.0047 27.6302 54.078 28.1503 52.9989 28.5147C51.9199 28.8796 50.7299 29.0625 49.43 29.0625C48.1848 29.0625 46.8776 28.9153 45.5084 28.6203C44.1386 28.3258 42.956 27.9396 41.96 27.4616L42.4162 25.9034C43.5505 26.4091 44.6711 26.7953 45.778 27.0615C46.8845 27.3293 48.0739 27.4616 49.347 27.4616C51.5051 27.4616 53.2202 26.9351 54.4932 25.8826C55.7653 24.8295 56.4023 23.3903 56.4023 21.5653C56.4023 20.5827 56.2083 19.7404 55.821 19.0379C55.4336 18.3363 54.929 17.7112 54.3066 17.1638C53.6838 16.616 52.9711 16.1321 52.169 15.7107C51.3664 15.2893 50.536 14.8684 49.6786 14.447C48.6553 13.9413 47.7076 13.4435 46.8361 12.9517C45.9646 12.4609 45.2177 11.913 44.5954 11.3092C43.9726 10.7053 43.4885 10.0246 43.1426 9.26609C42.7963 8.50804 42.6238 7.60969 42.6238 6.57054C42.6238 5.44761 42.8378 4.47192 43.2672 3.64298C43.6956 2.81552 44.2696 2.13432 44.9891 1.60037C45.7087 1.06741 46.5386 0.667317 47.4795 0.400093C48.4198 0.133364 49.4022 0 50.426 0C51.6712 0 52.8675 0.140801 54.016 0.420915C55.1639 0.702021 56.1947 1.08129 57.1077 1.55823L56.6924 3.1586C55.6964 2.68166 54.6798 2.30289 53.6423 2.02178C52.6047 1.74117 51.5603 1.60037 50.5091 1.60037C48.7661 1.60037 47.3197 2.00046 46.1722 2.80065C45.0238 3.60083 44.4498 4.82987 44.4498 6.48626C44.4498 7.30132 44.5675 7.9964 44.803 8.5715C45.0375 9.1471 45.3902 9.66618 45.8611 10.1297C46.331 10.5928 46.9191 11.0355 47.6245 11.4564C48.3304 11.8778 49.1667 12.3131 50.1354 12.7618C51.0205 13.1832 51.9409 13.6542 52.8954 14.1733ZM25.941 0.505148L15.0266 28.5573H16.8526L19.7162 20.9758H33.4531L36.3577 28.5573H38.1841L27.2693 0.505148H25.941ZM20.3385 19.375L26.6054 2.86407L32.8717 19.375H20.3385Z" fill="black"></path>
              <path d="M79.8671 13.9442H62.8855V0.9375H61.0457V29.0625H62.8855V15.6333H79.8671V29.0625H81.7074V0.9375H79.8671V13.9442Z" fill="black"></path>
              <path d="M87.3423 29.0625H89.2197V0.9375H87.3423V29.0625Z" fill="black"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M92.9774 15C92.9774 6.72876 99.7187 0 108.004 0C116.29 0 123.031 6.72876 123.031 15C123.031 23.2712 116.29 30 108.004 30C99.7187 30 92.9774 23.2712 92.9774 15ZM94.9807 15C94.9807 22.168 100.823 27.9998 108.004 27.9998C115.185 27.9998 121.027 22.168 121.027 15C121.027 7.83194 115.185 2.00018 108.004 2.00018C100.823 2.00018 94.9807 7.83194 94.9807 15Z" fill="black"></path>
            </svg>
            </Links>
          </Box>
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {userName ? (
            <Menu w={{md:'5vw', basic:'5vw'}}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {userName}
              </MenuButton>
              <MenuList>
                <MenuItem as={NavLink} to="/profile">Profile</MenuItem>
                <MenuItem as={NavLink} to="/cart">Your Cart</MenuItem>
                <MenuItem as={NavLink} to="/underwork">Your Orders</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={NavLink}
                to='/signIn'
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}>
                Sign In
              </Button>
              <Button
                as={NavLink}
                to='/signUp'
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                _hover={{
                  bg: 'pink.300',
                }}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                as={NavLink}
                to={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      as={NavLink}
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Categories',
    children: [
      {
        label: 'Mens Products',
        subLabel: 'Trending Design to inspire you',
        href: '/mensproducts',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '/underwork',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '/underwork',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '/underwork',
      },
    ],
  },
  {
    label: 'New Collections',
    href: '/mensproducts',
  },
  {
    label: 'Hire Designers',
    href: '/underwork',
  },
];
