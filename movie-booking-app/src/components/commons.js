import styled from "styled-components";

export const LogInContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 40px);
`;

export const InputText = styled.input`
    flex: 1;
    border: none;
    outline: none;
    padding: 8px 12px;
    border-radius: 8px;
    margin: 5px 20px 10px;
    box-shadow: 0px 0px 0px 1px #ddd;

    &:focus {
        box-shadow: 0px 0px 0px 2px #e91e94;
    }
`;

export const LoginButton = styled.button`
    color: #fff;
    border: none;
    margin: 20px;
    outline: none;
    cursor: pointer;
    padding: 10px 6px;
    background: #4331ed;
    border-radius: 8px;

    &: hover {
        background: #2d1bdb;
        box-shadow: 0px 1px 4px 1px rgb(0 0 0 / 10%),
            0px 1px 4px -1px rgb(0 0 0 / 10%), 0px 1px 7px 1px rgb(0 0 0 / 10%);
    }
`;

export const ContentWrapper = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
`;

export const HeaderText = styled.span`
    color: gray;
    font-size: 18px;
    padding-left: 24px;
    margin-bottom: 10px;
`;

export const PasswordWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const LockIcon = styled.span`
    right: 30px;
    color: #777;
    padding: 2px;
    cursor: pointer;
    position: absolute;

    & > svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        color: #4331ed;
        border-radius: 2px;
    }
`;
