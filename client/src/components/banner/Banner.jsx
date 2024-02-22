import { styled, Box, Typography } from "@mui/material";

const StyledBox = styled(Box)`
  width: 100%;
  background: #83c0c1;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 7em;
  color: #9d4ccc;
  line-height: 0.9;
`;
const ReflectedHeading = styled(Heading)`
  transform: scaleY(-1) skewX(-20deg); 
  position: relative;
  left: 15px;
  display: inline-block;
  background: linear-gradient(to bottom, rgba(157, 76, 204, 1) 0%, rgba(157, 76, 204, 0.1) 100%);
  background-clip: text;
  color: transparent;
`;

const Banner = () => {
  return (
    <StyledBox>
      <div style={{ textAlign: "center",  marginTop:"45px" }}> 
        <Heading>Reflect</Heading>
        <ReflectedHeading>Reflect</ReflectedHeading>
      </div>
    </StyledBox>
  );
};

export default Banner;
