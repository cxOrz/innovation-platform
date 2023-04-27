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
      {
        status >= 0 ?
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
          :
          <Terminated />
      }
    </Box>
  );
}

function Terminated() {
  return (
    <div>
      <Typography variant="h5" textAlign="center">感谢信</Typography>
      <p>亲爱的同学：</p>
      <p>
        你好！非常感谢你对软创实验室的信任，并抽出宝贵时间参与我们的招新活动。你的申请已进入软创人才库，我们会持续保持关注，期望有再次合作的机会。
      </p>
      <p>
        最后，衷心祝愿追逐梦想的你梦想成真！再次感谢!
      </p>
      <p style={{ textAlign: 'end', marginTop: '2rem' }}>
        软创招新
      </p>
    </div>
  );
}
