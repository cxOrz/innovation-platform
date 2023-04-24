import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

interface JoinStatusProps {
  status: number;
}

const steps = [
  { label: '提交申请', description: '需花费1-2天进行整理，排查错误信息' },
  { label: '初筛', description: '我们将对申请进行查阅，并作出初步筛选' },
  { label: '笔试', description: '完成笔试后，请耐心等待批改，通常一周内告知后续' },
  { label: '复筛', description: '我们会根据笔试成绩进行复筛，并发送面试邀请' },
  { label: '面试', description: '根据面试评价，选出部分同学进入后续流程' },
  { label: '意向通知', description: '根据申请、笔试成绩、面试评价，筛选出合适的同学并发送意向通知' }
];

export default function JoinStatus({ status = 0 }: JoinStatusProps) {
  return (
    <Box sx={{ maxWidth: 1000 }}>
      <Stepper activeStep={status} orientation='vertical'>
        {steps.map((step) =>
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography variant="subtitle2">{step.description}</Typography>
            </StepContent>
          </Step>
        )}
      </Stepper>
    </Box>
  );
}