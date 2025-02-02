/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */

import React, { VFC } from 'react';
import {
  useFieldArray,
  Controller,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LineChart from './MoveLineChart';

// eslint-disable-next-line import/no-cycle
import { FormValues } from '../../models/Form';

type Props = {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  loggingMethod: string;
  jploggingMethod: string;
  errors: any;
  clearErrors: any;
};

const LoggingCostCalculator: VFC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    loggingMethod,
    jploggingMethod,
    errors,
    clearErrors,
  } = props;

  const { fields: LoggingDiameterFields } = useFieldArray({
    control,
    // eslint-disable-next-line
    // @ts-ignore
    name: `${loggingMethod}.Diameter`,
  });

  const { fields: LoggingPriceFields } = useFieldArray({
    control,
    // eslint-disable-next-line
    // @ts-ignore
    name: `${loggingMethod}.Price`,
  });

  const formTitleAndDescription = {
    Logging: {
      YieldRate: {
        title: `${jploggingMethod}材の歩留まり`,
        description: `${jploggingMethod}した材のうち、市場に出せる割合です`,
      },
      Cost: {
        title: `${jploggingMethod}のコスト`,
        description: `素材生産費と運材費の合計です`,
      },
      StumpHeight: {
        title: `${jploggingMethod}材の伐採高`,
        description: '林分で木を切る時の高さのことです',
      },
      LogLength: {
        title: 'LogLength',
        description: '説明が入ります',
      },
      LoggingPitch: {
        title: 'LoggingPitch',
        description: '説明が入ります',
      },
      Price: {
        title: `${jploggingMethod}した木材の価格`,
        description: '胸高直径に対する木材の価格を入力してください',
      },
    },
  };

  const isNumber = /^[-]?\d*(\.\d+)?$/;

  // eslint-disable-next-line
  // @ts-ignore
  const watchCostCalculation: any = watch(`${loggingMethod}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // console.log(watchSdmd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: Array<Array<number>> = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 11; index++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const Xelement = Number(watchCostCalculation.Diameter[index].value);
    const Yelement = Number(watchCostCalculation.Price[index].value);
    data[index] = [Xelement, Yelement];
  }

  const tableAllErrors: string[] = [];
  if (errors[loggingMethod]?.Diameter !== undefined) {
    errors[loggingMethod]?.Diameter.map((item: any, index: number) => {
      tableAllErrors.push(item.value.message);
    });
  }

  // const chartPriceAllErrors: string[] = [];
  if (errors[loggingMethod]?.Price !== undefined) {
    errors[loggingMethod]?.Price.map((item: any, index: number) => {
      tableAllErrors.push(item.value.message);
    });
  }

  const tableErrors = [...new Set(tableAllErrors)];

  return (
    <div>
      {errors.score && errors.score.type === 'validate' && (
        <div className="error">Your score must be and even number</div>
      )}
      <div className="card">
        <div className="form-title">{`${jploggingMethod}`}材の費用計算</div>
        <div className="">
          <ul className="thinning-form-items">
            <li className="input-form-items yield-rate-item">
              <p className="control-label">
                {formTitleAndDescription.Logging.YieldRate.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Logging.YieldRate.description}
              </p>
              <Controller
                control={control}
                // @ts-ignore
                name={`${loggingMethod}.YieldRate`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors[loggingMethod]?.YieldRate)}
                    helperText={
                      errors[loggingMethod]?.YieldRate &&
                      errors[loggingMethod].YieldRate.message
                    }
                  />
                )}
              />
            </li>

            <li className="input-form-items cost-item">
              <p className="control-label">
                {formTitleAndDescription.Logging.Cost.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Logging.Cost.description}
              </p>
              <Controller
                control={control}
                // @ts-ignore
                name={`${loggingMethod}.Cost`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">円</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors[loggingMethod]?.Cost)}
                    helperText={
                      errors[loggingMethod]?.Cost &&
                      errors[loggingMethod].Cost.message
                    }
                  />
                )}
              />
            </li>

            <li className="input-form-items stump-height-item">
              <p className="control-label">
                {formTitleAndDescription.Logging.StumpHeight.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Logging.StumpHeight.description}
              </p>
              <Controller
                control={control}
                // @ts-ignore
                name={`${loggingMethod}.StumpHeight`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors[loggingMethod]?.StumpHeight)}
                    helperText={
                      errors[loggingMethod]?.StumpHeight &&
                      errors[loggingMethod].StumpHeight.message
                    }
                  />
                )}
              />
            </li>

            {/* <li className="input-form-items log-length-input">
              <p className="control-label">
                {formTitleAndDescription.Logging.LogLength.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Logging.LogLength.description}
              </p>
              <Controller
                control={control}
                // @ts-ignore
                name={`${loggingMethod}.LogLength`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">本/ha</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors[loggingMethod]?.LogLength)}
                    helperText={
                      errors[loggingMethod]?.LogLength &&
                      errors[loggingMethod].LogLength.message
                    }
                  />
                )}
              />
            </li> */}
            {/* <li className="input-form-items logging-pitch-input">
              <p className="control-label">
                {formTitleAndDescription.Logging.LoggingPitch.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Logging.LoggingPitch.description}
              </p>
              <Controller
                control={control}
                // @ts-ignore
                name={`${loggingMethod}.LoggingPitch`}
                rules={{
                  pattern: {
                    value: isNumber,
                    message: '半角数字で入力してください',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={Boolean(errors[loggingMethod]?.LoggingPitch)}
                    helperText={
                      errors[loggingMethod]?.LoggingPitch &&
                      errors[loggingMethod].LoggingPitch.message
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">本/ha</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                )}
              />
        
            </li> */}

            <li className="input-form-items">
              <p className="control-label">
                {formTitleAndDescription.Logging.Price.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Logging.Price.description}
              </p>
              {tableErrors.length >= 1 && (
                <ul className="table-errors">
                  {tableErrors.map((chartError, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index}>{chartError}</li>
                  ))}
                </ul>
              )}

              <ul className="table">
                <li className="thinning-diameter-input-title TextField-without-border-radius">
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="胸高直径(cm)"
                    disabled
                  />
                </li>
                {LoggingDiameterFields.map((LoggingDiameterField, index) => (
                  <li
                    className="thinning-diameter-input TextField-without-border-radius"
                    key={LoggingDiameterField.id}
                  >
                    <Controller
                      control={control}
                      // @ts-ignore
                      name={`${loggingMethod}.Diameter.${index}.value`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          error={Boolean(
                            errors[loggingMethod]?.Diameter?.[index],
                          )}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                className="display-none"
                              >
                                cm
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </li>
                ))}

                <li className="thinning-price-input-title TextField-without-border-radius">
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="価格(円)"
                    disabled
                  />
                </li>
                {LoggingPriceFields.map((ThinningPriceField, index) => (
                  <li
                    className="TextField-without-border-radius"
                    key={ThinningPriceField.id}
                  >
                    <Controller
                      control={control}
                      // @ts-ignore
                      name={`${loggingMethod}.Price.${index}.value`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          error={Boolean(errors[loggingMethod]?.Price?.[index])}
                          // helperText={
                          //   errors[loggingMethod]?.Price &&
                          //   errors[loggingMethod]?.Price?.[index]?.value
                          //     ?.message
                          // }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                className="display-none"
                              >
                                円
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <LineChart
            description=""
            title=""
            loggingMethod={loggingMethod}
            register={register}
            handleSubmit={handleSubmit}
            control={control}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
            xaxisTitle="胸高直径"
            xaxisUnit="cm"
            yaxisTitle="金額"
            yaxisUnit="円"
            xaxisMax={40}
            // yaxisMax={20000}
            xaxisMin={0}
            yaxisMin={0}
            data={data}
            isdrag
          />
        </div>
      </div>
    </div>
  );
};

export default LoggingCostCalculator;
