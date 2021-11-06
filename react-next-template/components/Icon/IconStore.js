import React from 'react';

const IconStore = ({ ...styles }) => {
    return (
        <div {...styles}>
            <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52 25.61H8C6.89543 25.61 6 26.5054 6 27.61V56C6 57.1046 6.89543 58 8 58H52C53.1046 58 54 57.1046 54 56V27.61C54 26.5054 53.1046 25.61 52 25.61Z" fill="white" />
                <path d="M52 27.61V56H8V27.61H52ZM52 23.61H8C6.93913 23.61 5.92172 24.0314 5.17157 24.7816C4.42142 25.5317 4 26.5491 4 27.61V56C4 57.0609 4.42142 58.0783 5.17157 58.8284C5.92172 59.5786 6.93913 60 8 60H52C53.0609 60 54.0783 59.5786 54.8284 58.8284C55.5786 58.0783 56 57.0609 56 56V27.61C56 26.5491 55.5786 25.5317 54.8284 24.7816C54.0783 24.0314 53.0609 23.61 52 23.61Z" fill="#343434" />
                <path d="M51 33.46C47.14 33.46 44 29.99 44 25.73C44 21.47 47.14 18 51 18C54.86 18 58 21.47 58 25.73C58 29.99 54.86 33.46 51 33.46Z" fill="white" />
                <path d="M51 20C53.76 20 56 22.57 56 25.73C56 28.89 53.76 31.46 51 31.46C48.24 31.46 46 28.89 46 25.73C46 22.57 48.24 20 51 20ZM51 16C46 16 42 20.36 42 25.73C42 31.1 46 35.46 51 35.46C56 35.46 60 31.1 60 25.73C60 20.36 56 16 51 16Z" fill="#343434" />
                <path d="M37 34C33.14 34 30 30.5301 30 26.2701C30 22.01 33.14 18.54 37 18.54C40.86 18.54 44 22.01 44 26.2701C44 30.5301 40.86 34 37 34Z" fill="white" />
                <path d="M37 20.54C39.76 20.54 42 23.1101 42 26.2701C42 29.43 39.76 32 37 32C34.24 32 32 29.43 32 26.2701C32 23.1101 34.24 20.54 37 20.54ZM37 16.54C32 16.54 28 20.9001 28 26.2701C28 31.64 32 36 37 36C42 36 46 31.64 46 26.2701C46 20.9001 42 16.54 37 16.54Z" fill="#343434" />
                <path d="M23 34C19.14 34 16 30.5301 16 26.2701C16 22.01 19.14 18.54 23 18.54C26.86 18.54 30 22.01 30 26.2701C30 30.5301 26.86 34 23 34Z" fill="white" />
                <path d="M23 20.54C25.76 20.54 28 23.1101 28 26.2701C28 29.43 25.76 32 23 32C20.24 32 18 29.43 18 26.2701C18 23.1101 20.24 20.54 23 20.54ZM23 16.54C18 16.54 14 20.9001 14 26.2701C14 31.64 18 36 23 36C28 36 32 31.64 32 26.2701C32 20.9001 28 16.54 23 16.54Z" fill="#343434" />
                <path d="M9 34C5.14 34 2 30.5301 2 26.2701C2 22.01 5.14 18.54 9 18.54C12.86 18.54 16 22.01 16 26.2701C16 30.5301 12.86 34 9 34Z" fill="white" />
                <path d="M9 20.54C11.76 20.54 14 23.1101 14 26.2701C14 29.43 11.76 32 9 32C6.24 32 4 29.43 4 26.2701C4 23.1101 6.24 20.54 9 20.54ZM9 16.54C4 16.54 0 20.9001 0 26.2701C0 31.64 4 36 9 36C14 36 18 31.64 18 26.2701C18 20.9001 14 16.54 9 16.54Z" fill="#343434" />
                <path d="M29.5 42C30.9579 42.0026 32.3553 42.583 33.3862 43.6138C34.417 44.6447 34.9974 46.0421 35 47.5V56H24V47.5C24.0026 46.0421 24.583 44.6447 25.6138 43.6138C26.6447 42.583 28.0421 42.0026 29.5 42ZM29.5 38C26.9804 38 24.5641 39.0009 22.7825 40.7825C21.0009 42.5641 20 44.9804 20 47.5V60H39V47.5C39 44.9804 37.9991 42.5641 36.2175 40.7825C34.4359 39.0009 32.0196 38 29.5 38Z" fill="#343434" />
                <path d="M4.16992 27C3.89057 26.9867 3.61782 26.9106 3.37197 26.7772C3.12612 26.6439 2.91349 26.4569 2.74992 26.23C2.43372 25.805 2.20989 25.3186 2.09278 24.8019C1.97568 24.2853 1.9679 23.7499 2.06993 23.23L8.13993 4.33005V4.23004C8.19875 3.68752 8.43414 3.17934 8.80995 2.78366C9.18575 2.38798 9.68115 2.12671 10.2199 2.04004H49.7399C50.2787 2.12671 50.7741 2.38798 51.1499 2.78366C51.5257 3.17934 51.7611 3.68752 51.8199 4.23004V4.33005L57.8899 23.23C57.992 23.7499 57.9841 24.2853 57.867 24.8019C57.7499 25.3186 57.5261 25.805 57.2099 26.23C57.0463 26.4569 56.8337 26.6439 56.5879 26.7772C56.342 26.9106 56.0693 26.9867 55.7899 27H4.16992Z" fill="white" />
                <path d="M49.6 4C49.7459 4.17865 49.8424 4.39241 49.88 4.62V4.81L49.94 5L55.94 23.66C55.9815 23.8927 55.9754 24.1314 55.9221 24.3617C55.8689 24.592 55.7695 24.8092 55.63 25H4.33C4.1905 24.8092 4.09112 24.592 4.03784 24.3617C3.98456 24.1314 3.97849 23.8927 4.02 23.66L10 5L10.06 4.81V4.62C10.0976 4.39241 10.1941 4.17865 10.34 4H49.54H49.6ZM49.7 0H10.24C9.24369 0.0792142 8.30427 0.496013 7.57696 1.1815C6.84965 1.86699 6.378 2.78014 6.23999 3.77L0.169996 22.68C-0.520004 25.88 1.47 29 4.17 29H55.83C58.56 29 60.55 25.88 59.83 22.68L53.76 3.77C53.622 2.78014 53.1503 1.86699 52.423 1.1815C51.6957 0.496013 50.7563 0.0792142 49.76 0H49.7Z" fill="#343434" />
            </svg>
        </div>
    );
}

export default IconStore;