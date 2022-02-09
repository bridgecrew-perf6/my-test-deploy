/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import schema from '../../validation/MainValidation';

import 'katex/dist/katex.min.css';
import Headers from './Header';
import './Form.css';
// import StandDensityManagementData from '../../data/StandDensityManagementData.json';
import StandDensityManagementData from '../../data/StandDensityManagementData';
import Management from '../organism/ManagementForm';
// eslint-disable-next-line import/namespace
import DensityManagement from '../organism/DensityManagement';
import LoggingCostCalculator from '../organism/LoggingCostCalculator';
import { FormValues } from '../../models/Form';
import { AppDispatch, RootState } from '../../redux/store';
import { addCalculationResult } from '../../redux/CalculationResultSlice';
import { CalculationResultType } from '../../models/CalculationResult';

const Form = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const calculationResult = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const selectedKochiHinokiData = StandDensityManagementData.find(
    (v) => v.number === Number(10),
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      SDMD: {
        FormulaTreeHeight: [
          { value: 32.84414 },
          { value: 0.0136 },
          { value: 0 },
          { value: 0.92438 },
        ],
        H: [
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.H[0],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.H[1],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.H[2],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.H[3],
          },
        ],
        V: [
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.V[0],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.V[1],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.V[2],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.V[3],
          },
        ],
        // eslint-disable-next-line
        // @ts-ignore
        NRf: selectedKochiHinokiData.SDMD.NRf,
        DBH: [
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.DBH[0],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.DBH[1],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.DBH[2],
          },
        ],
        HF: [
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.HF[0],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.HF[1],
          },
          {
            value:
              // eslint-disable-next-line
              // @ts-ignore
              selectedKochiHinokiData.SDMD.HF[2],
          },
        ],
      },
      Density: { Plant: [{ value: 500 }, { value: 5000 }], Minimum: 450 },
      RegenerationCost: [{ value: 1953682 }, { value: 375 }],
      ThinningPercent: [{ value: 10 }, { value: 50 }],
      AnnualInterestPercent: 0.8,
      HarvestingAges: [{ value: 10 }, { value: 200 }, { value: 5 }],
      MaxNumOfHarvest: 10,
      Thinning: {
        YieldRate: 0.58,
        Cost: 10947,
        StumpHeight: 0.5,
        LogLength: 4,
        LoggingPitch: 4.1,
        Diameter: [
          { value: 6 },
          { value: 8 },
          { value: 9 },
          { value: 12 },
          { value: 14 },
          { value: 15 },
          { value: 16 },
          { value: 18 },
          { value: 22 },
          { value: 24 },
          { value: 28 },
        ],
        Price: [
          { value: 9000 },
          { value: 9000 },
          { value: 9000 },
          { value: 9000 },
          { value: 9000 },
          { value: 12500 },
          { value: 12500 },
          { value: 13500 },
          { value: 13500 },
          { value: 14000 },
          { value: 14000 },
        ],
      },
      Clearcut: {
        YieldRate: 0.58,
        Cost: 6869,
        StumpHeight: 0.5,
        LogLength: 4,
        LoggingPitch: 4.1,
        Diameter: [
          { value: 6 },
          { value: 8 },
          { value: 9 },
          { value: 12 },
          { value: 14 },
          { value: 15 },
          { value: 16 },
          { value: 18 },
          { value: 22 },
          { value: 24 },
          { value: 28 },
        ],
        Price: [
          { value: 9000 },
          { value: 9000 },
          { value: 9000 },
          { value: 9000 },
          { value: 9000 },
          { value: 12500 },
          { value: 12500 },
          { value: 13500 },
          { value: 13500 },
          { value: 14000 },
          { value: 14000 },
        ],
      },
    },
  });

  const [response, setResponse] = useState<any>('');
  // const [post, setPost] = useState<any>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseToPost, setResponseToPost] = useState<any>('');

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // console.log(watch())

  const navigate = useNavigate();

  const callApi = async () => {
    const Testresponse = await fetch('/api/hello');
    const body = await Testresponse.json();
    if (Testresponse.status !== 200) throw Error(body.message);

    return body;
  };

  useEffect(() => {
    callApi()
      .then((res) => setResponse(res.express))
      .catch((err) => console.log(err));
  });

  const checkKeyDown = (e: any) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const onSubmit = (data: FormValues) => {
    // e.preventDefault();
    setLoading(true);

    const DataSdmdH: number[] = [];
    data.SDMD.H.map((value) => {
      DataSdmdH.push(value.value);
    });
    const DataSdmdV: number[] = [];
    data.SDMD.V.map((value) => {
      DataSdmdV.push(value.value);
    });
    const DataSdmdDBH: number[] = [];
    data.SDMD.DBH.map((value) => {
      DataSdmdDBH.push(value.value);
    });
    const DataSdmdHF: number[] = [];
    data.SDMD.HF.map((value) => {
      DataSdmdHF.push(value.value);
    });

    const Json = {
      //  JAVAのAPIのためにデータの形を変える
      SH: {
        YieldModelType: 'S',
        SAType: '2021',

        SDMD: {
          H: DataSdmdH,
          V: DataSdmdV,
          NRf: data.SDMD.NRf,
          DBH: DataSdmdDBH,
          HF: DataSdmdHF,
        },
        Density: {
          Plant: [data.Density.Plant[0].value, data.Density.Plant[1].value],
          MinimumAtClearcut: data.Density.Minimum,
        },
        RegenerationCost: [
          data.RegenerationCost[0].value,
          data.RegenerationCost[1].value,
        ],
        ThinningPercent: [
          data.ThinningPercent[0].value,
          data.ThinningPercent[1].value,
        ],
        AnnualInterestPercent: data.AnnualInterestPercent,
        HarvestingAges: [
          data.HarvestingAges[0].value,
          data.HarvestingAges[1].value,
          data.HarvestingAges[2].value,
        ],
        MaxNumOfHarvest: data.MaxNumOfHarvest,
        NumSearch: [3, 10000],
        Thinning: {
          YieldRate: data.Thinning.YieldRate,
          Cost: data.Thinning.Cost,
          StumpHeight: data.Thinning.StumpHeight,
          LogLength: data.Thinning.LogLength,
          LoggingPitch: data.Thinning.LoggingPitch,
          Diameter: [
            data.Thinning.Diameter[0].value,
            data.Thinning.Diameter[1].value,
            data.Thinning.Diameter[2].value,
            data.Thinning.Diameter[3].value,
            data.Thinning.Diameter[4].value,
            data.Thinning.Diameter[5].value,
            data.Thinning.Diameter[6].value,
            data.Thinning.Diameter[7].value,
            data.Thinning.Diameter[8].value,
            data.Thinning.Diameter[9].value,
            data.Thinning.Diameter[10].value,
          ],
          Price: [
            data.Thinning.Price[0].value,
            data.Thinning.Price[1].value,
            data.Thinning.Price[2].value,
            data.Thinning.Price[3].value,
            data.Thinning.Price[4].value,
            data.Thinning.Price[5].value,
            data.Thinning.Price[6].value,
            data.Thinning.Price[7].value,
            data.Thinning.Price[8].value,
            data.Thinning.Price[9].value,
            data.Thinning.Price[10].value,
          ],
        },
        Clearcut: {
          YieldRate: data.Clearcut.YieldRate,
          Cost: data.Clearcut.Cost,
          StumpHeight: data.Clearcut.StumpHeight,
          LogLength: data.Clearcut.LogLength,
          LoggingPitch: data.Clearcut.LoggingPitch,
          Diameter: [
            data.Clearcut.Diameter[0].value,
            data.Clearcut.Diameter[1].value,
            data.Clearcut.Diameter[2].value,
            data.Clearcut.Diameter[3].value,
            data.Clearcut.Diameter[4].value,
            data.Clearcut.Diameter[5].value,
            data.Clearcut.Diameter[6].value,
            data.Clearcut.Diameter[7].value,
            data.Clearcut.Diameter[8].value,
            data.Clearcut.Diameter[9].value,
            data.Clearcut.Diameter[10].value,
          ],
          Price: [
            data.Clearcut.Price[0].value,
            data.Clearcut.Price[1].value,
            data.Clearcut.Price[2].value,
            data.Clearcut.Price[3].value,
            data.Clearcut.Price[4].value,
            data.Clearcut.Price[5].value,
            data.Clearcut.Price[6].value,
            data.Clearcut.Price[7].value,
            data.Clearcut.Price[8].value,
            data.Clearcut.Price[9].value,
            data.Clearcut.Price[10].value,
          ],
        },
        SA: {
          Comment: 'Type L 1000 yen/ha degradation for SEV',
          NumRepeat: 40,
          NumTempLevel: 100,
          MetaSearchPercentile: 0.75,
          NumTotalLoopN: [1, 8],
          NumTotalLoopPow: [3.55, 6.75],
          StartTemp: [0, -0.6, 0.6, 5],
          DiffTemp: [0, -3.8, 1.4, 5],
          DistScale: [0, -1.2, 0.6, 5],
        },
      },
    };

    console.log(JSON.stringify(Json));
    // console.log(JSON.stringify(data));
    const abortCtrl = new AbortController();
    void axios
      .post<CalculationResultType>('/api/calculation', Json)
      .then((res) => {
        // eslint-disable-next-line
        // @ts-ignore
        dispatch(addCalculationResult(JSON.parse(res.data)));

        navigate('/submit');
      })
      .catch(() => {
        alert(
          '計算に失敗しました。お手数ですが、管理者に問い合わせをしてください。',
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // const Test1response: any = await fetch('/api/world', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(Json),
    // });
    // const body = await Test1response.text();
    // console.log(body)
    // setResponseToPost(body);
    return () => {
      abortCtrl.abort();
    };
  };

  return (
    <div className="form-wrapper">
      <div className="formDescription ">
        <p className="form-title">林業経営のデータを入力してください</p>
      </div>

      {/* <p>{response}</p>
      <p>{JSON.stringify(responseToPost)}</p> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <DensityManagement
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
        />
        <Management
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          clearErrors={clearErrors}
          setError={setError}
        />
        <LoggingCostCalculator
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          loggingMethod="Thinning"
          jploggingMethod="間伐"
          errors={errors}
          clearErrors={clearErrors}
        />
        <LoggingCostCalculator
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          loggingMethod="Clearcut"
          jploggingMethod="皆伐"
          errors={errors}
          clearErrors={clearErrors}
        />
        {/* <button type="button" onClick={onSubmit(watch())}>送信</button> */}
        {/* <input type="button" onClick={onSubmit(watch())} value="ボタン２" /> */}
        <input className="submit-button" type="submit" value="計算する" />
        {loading && (
          <>
            <div className="isCalculation">
              <p>計算中です</p>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
