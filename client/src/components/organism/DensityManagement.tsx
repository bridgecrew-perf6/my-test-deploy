/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable array-callback-return */

import React, { useCallback, useState, VFC } from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TeX from '@matejmazur/react-katex';
import { MenuItem } from '@material-ui/core';
import exp from 'constants';
import { FormValues } from '../../models/Form';
// import StandDensityManagementData from '../../data/StandDensityManagementData.json';
import StandDensityManagementData from '../../data/StandDensityManagementData';

type Props = {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: any;
  setError: any;
  clearErrors: any;
};

const DensityManagement: VFC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    errors,
    setError,
    clearErrors,
  } = props;

  const { fields: HFields } = useFieldArray({
    control,
    name: 'SDMD.H',
  });
  const { fields: FormulaTreeHeight } = useFieldArray({
    control,
    name: 'SDMD.FormulaTreeHeight',
  });
  const { fields: VFields } = useFieldArray({ control, name: 'SDMD.V' });
  // eslint-disable-next-line
  const { fields: DBHFields, remove: DBHRemove } = useFieldArray({
    control,
    name: 'SDMD.DBH',
  });
  // eslint-disable-next-line
  const { fields: HFFields, remove: HFRemove } = useFieldArray({
    control,
    name: 'SDMD.HF',
  });

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedData = StandDensityManagementData.find(
      (v) => v.number === Number(value),
    );

    // eslint-disable-next-line
    // @ts-ignore
    selectedData.SDMD.V.map((num: number, index: number) => {
      setValue(`SDMD.V.${index}.value`, num);
    });

    // eslint-disable-next-line
    // @ts-ignore
    selectedData.SDMD.DBH.map((num: number, index: number) => {
      setValue(`SDMD.DBH.${index}.value`, num);
    });

    // eslint-disable-next-line
    // @ts-ignore
    selectedData.SDMD.HF.map((num: number, index: number) => {
      setValue(`SDMD.HF.${index}.value`, num);
    });
    // eslint-disable-next-line
    // @ts-ignore
    setValue(`SDMD.NRf`, selectedData.SDMD.NRf);
  };

  // const watchAllFields = watch();
  const watchSdmd: any = watch('SDMD');
  // const testtest: any = watch('test')
  // console.log(testtest)

  const treeHeightItems = ['a', 'b', 'c', 'd'];
  const [SdmdItemsValues, setSdmdItemValue] = useState([
    watchSdmd.H[0].value,
    watchSdmd.H[1].value,
    watchSdmd.H[2].value,
    watchSdmd.H[3].value,
  ]);

  const [TreeHeightValues, setTreeHeightValue] = useState([
    32.84414, 0.0136, 0, 0.92438,
  ]);

  // helperText={
  //   errors.SDMD?.FormulaTreeHeight &&
  //   errors?.SDMD?.FormulaTreeHeight?.[index].value.message
  // }

  const tableAllErrors: string[] = [];
  if (errors.SDMD?.FormulaTreeHeight !== undefined) {
    errors.SDMD.FormulaTreeHeight.map((item: any, index: number) => {
      tableAllErrors.push(item.value.message);
    });
  }

  const tableErrors = [...new Set(tableAllErrors)];
  // console.log(tableErrors)

  //  このコードは非常に良くないです。そして、大きいバグも潜んでいる。
  //  react-hook-formを使うと、default-valueが部分的に(複雑な条件の時)に設定できなくなるバグがある。余裕がある時に、ライブラリを退けて、自分で作成するべし
  // const defaultTreeHeightValue = [32.84414, 0.0136, 0, 0.92438];

  // window.addEventListener('load', () => {
  //   console.log('page is loaded');
  //   // id={`FormulaTreeHeight-${index}`}
  //   treeHeightItems.map((te, index) => {
  //     // eslint-disable-next-line
  //     // @ts-ignore
  //     const element = document.getElementById(`FormulaTreeHeight-${index}`);
  //     // eslint-disable-next-line
  //     // @ts-ignore
  //     element.defaultValue = defaultTreeHeightValue[index];
  //   });
  // });

  const onChangeTreeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('わ');
  };

  return (
    <div>
      <div className="card">
        <div className="form-title">林分の成長のデータ</div>
        <div className="sdmd-items">
          <div className="input-form-items">
            <input {...register('SDMD.NRf')} className="display-none" />

            <ul className="display-none">
              {VFields.map((field, index) => (
                <li key={field.id}>
                  <input {...register(`SDMD.V.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <ul className="display-none">
              {DBHFields.map((field, index) => (
                <li key={field.id}>
                  <input {...register(`SDMD.DBH.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <ul className="display-none">
              {HFFields.map((field, index) => (
                <li key={field.id}>
                  <input {...register(`SDMD.HF.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <div className="sdmd-form-item">
              <div className="control-label">林分密度管理図を選択する</div>
              <div className="control-description">
                選択することで、最適な林分材積を計算することができます。
              </div>
            </div>
          </div>
          <div className="cp_ipselect cp_sl01">
            <select defaultValue={10} onChange={selectChange}>
              {StandDensityManagementData.map((density, index: number) => (
                <>
                  <option key={density.number} value={density.number}>
                    {density.title}
                  </option>
                </>
              ))}
            </select>
          </div>
          {watchSdmd ? (
            <>
              <div className="sdmd-katexs-items">
                <div className="sdmd-katex-item sdmd-katex-formula">
                  <TeX>{String.raw`V = ({${watchSdmd.V[0].value}}H^{{${
                    watchSdmd.V[1].value
                  }}}{${
                    watchSdmd.V[2].value > 0
                      ? `+${watchSdmd.V[2].value}`
                      : `${watchSdmd.V[2].value}`
                  }}H^{{${watchSdmd.V[3].value}}}/N)^{-1}`}</TeX>
                  <br />
                  <TeX>{String.raw`HF = {${watchSdmd.HF[0].value}}{${
                    watchSdmd.HF[1].value > 0
                      ? `+${watchSdmd.HF[1].value}`
                      : `${watchSdmd.HF[1].value}`
                  }}H{${
                    watchSdmd.HF[2].value > 0
                      ? `+${watchSdmd.HF[2].value}`
                      : `${watchSdmd.HF[2].value}`
                  }}\sqrt{N}\cdot{H/100}`}</TeX>
                  <br />
                  <TeX>{String.raw`G = V/HF`}</TeX>
                  <br />
                  <TeX>{String.raw`\overline{dg} = 200\sqrt{G/(\pi\cdot{N})}`}</TeX>
                  <br />
                  <TeX>{String.raw`\overline{d} = {${watchSdmd.DBH[0].value}}{${
                    watchSdmd.DBH[1].value > 0
                      ? `+${watchSdmd.DBH[1].value}`
                      : `${watchSdmd.DBH[1].value}`
                  }}\overline{d}g{${
                    watchSdmd.DBH[2].value === 0
                      ? ``
                      : `${
                          watchSdmd.DBH[2].value > 0
                            ? `+${
                                watchSdmd.DBH[2].value
                              }${String.raw`\sqrt{N}\cdot{H/100}`}`
                            : `${
                                watchSdmd.DBH[2].value
                              }${String.raw`\sqrt{N}\cdot{H/100}`}`
                        }`
                  }}`}</TeX>
                  <br />
                  <TeX>{String.raw`\overline{R\footnotesize{y}} = V/V\tiny {Rf}`}</TeX>
                  <br />
                  <TeX>{String.raw`{V\tiny{Rf}} = ({${
                    watchSdmd.V[0].value
                  }}H^{${watchSdmd.V[1].value}}{${
                    watchSdmd.V[2].value > 0
                      ? `+${watchSdmd.V[2].value}`
                      : `${watchSdmd.V[2].value}`
                  }}H^{${watchSdmd.V[3].value}}/{N\tiny{Rf}})^{-1}`}</TeX>
                  <br />
                  <TeX>{String.raw`\log{N\tiny{Rf}} = {${watchSdmd.NRf}}{${
                    Math.round(
                      (watchSdmd.V[3].value - watchSdmd.V[1].value) * 100000,
                    ) / 100000
                  }}\log{H}`}</TeX>
                </div>

                <div className="sdmd-katex-item sdmd-katex-description">
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{V:ha当たり材積}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{H:上層樹高}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{N:ha当たり本数}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{HF:林分形状高}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{G:ha当たり断面積}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`\overline{dg}{\text{:断面積平均直径}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`\overline{d}{\text{:平均胸腔直径}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`\overline{R\footnotesize{y}}{\text{:収穫比数}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`{V\tiny{Rf}}{\text{:最多密度におけるha当たり材積}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`{N\tiny{Rf}}{\text{:最多密度におけるha当たり本数}}`}</TeX>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          <div className="treeHeightItems">
            <div className="input-form-items">
              <div className="control-label">樹高の成長</div>
              <div className="control-description">
                林齢<TeX>{String.raw`t`}</TeX>における樹高
                <TeX>{String.raw`H`}</TeX>は以下の式で表されます。
                <div className="sdmd-katexs-items tree-height-item">
                  <TeX>{String.raw`\color{black}H(t) = \textcolor{red}a[1-\exp\lbrace-\textcolor{red}b(t-\textcolor{red}c)\rbrace]\color{red}^d`}</TeX>
                </div>
                例：高知県のスギの3等地 a:62.37996, b:0.00446:, c:0, d:0.67572
                <br /> 例：高知県のヒノキの3等地 a:32.84414, b:0.01360:, c:0,
                d:0.92438
              </div>
              {tableErrors.length >= 1 && (
                <ul className="table-errors">
                  {tableErrors.map((chartError, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index}>{chartError}</li>
                  ))}
                </ul>
              )}
              <div className="H-inputs">
                {treeHeightItems.map((key, index) => (
                  <li className="input-form-items H-input" key={key}>
                    <p className="control-label H-input-label">
                      {treeHeightItems[index]}
                    </p>

                    {/* <input
                      value={TreeHeightValues[index]}
                      onChange={onChangeTreeHeight}
                    /> */}
                    <Controller
                      control={control}
                      // eslint-disable-next-line
                      // @ts-ignore
                      name={`SDMD.FormulaTreeHeight.${index}.value`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id={`FormulaTreeHeight-${index}`}
                          fullWidth
                          variant="outlined"
                          value={TreeHeightValues[index]}
                          error={Boolean(
                            errors.SDMD?.FormulaTreeHeight?.[index],
                          )}
                          // helperText={
                          //   errors.SDMD?.FormulaTreeHeight &&
                          //   errors?.SDMD?.FormulaTreeHeight?.[index].value.message
                          // }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            // setSdmdItemValue(SdmdItemsValues.splice(index, 1,e.target.value ))

                            function isNumber(str: any) {
                              const reg = new RegExp(
                                /^[+,-]?([1-9]\d*|0)(\.\d+)?$/,
                              );
                              const res = reg.test(str);

                              return res;
                            }

                            if (isNumber(e.target.value)) {
                              clearErrors(
                                `SDMD.FormulaTreeHeight.${index}.value`,
                              );
                            } else {
                              setError(
                                `SDMD.FormulaTreeHeight.${index}.value`,
                                {
                                  type: 'manual',
                                  message:
                                    '半角数値で入力してください',
                                },
                              );
                              console.log(
                                errors.SDMD.FormulaTreeHeight?.[index].value
                                  .message,
                              );
                            }

                            setSdmdItemValue(
                              SdmdItemsValues.map((SdmdItemsValue, SdmdIndex) =>
                                // eslint-disable-next-line
                                SdmdIndex === index
                                  ? e.target.value
                                  : SdmdItemsValue,
                              ),
                            );

                            setTreeHeightValue(
                              // eslint-disable-next-line
                              // @ts-ignore
                              TreeHeightValues.map(
                                (treeHeightValue, setIndex: number) =>
                                  setIndex === index
                                    ? e.target.value
                                    : treeHeightValue,
                              ),
                            );

                            console.log(TreeHeightValues);

                            if (index === 1) {
                              setValue(
                                `SDMD.H.${index}.value`,
                                -Number(e.target.value),
                              );
                              // console.log(e)
                              // eslint-disable-next-line
                              const SdmdC = SdmdItemsValues[2];
                              //  console.log(SdmdC * Number(e.target.value))
                              const caluculateValue = Math.exp(
                                SdmdC * Number(e.target.value),
                              );
                              setValue(
                                `SDMD.H.1.value`,
                                -Number(caluculateValue),
                              );

                              // if (
                              //   // eslint-disable-next-line no-restricted-globals
                              //   isNaN(Number(e.target.value)) ||
                              //   e.target.value === ''
                              // ) {
                              //   field.onChange('');
                              // } else {
                              //   // eslint-disable-next-line radix
                              //   field.onChange(parseInt(e.target.value));
                              // }
                            } else if (index === 2) {
                              // eslint-disable-next-line
                              const SdmdB = SdmdItemsValues[1];

                              const caluculateValue = Math.exp(
                                SdmdB * Number(e.target.value),
                              );
                              setValue(
                                `SDMD.H.1.value`,
                                -Number(caluculateValue),
                              );
                              // setValue(
                              //   `SDMD.FormulaTreeHeight.2.value`,
                              //   Number(e.target.value),
                              // );
                            } else {
                              setValue(
                                `SDMD.H.${index}.value`,
                                Number(e.target.value),
                              );
                              // setValue(
                              //   `SDMD.FormulaTreeHeight.${index}.value`,
                              //   Number(e.target.value),
                              // );
                            }
                          }}
                        />
                      )}
                    />
                  </li>
                ))}

                <div className="display-none">
                  {HFields.map((HField, index) => (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    <li className="input-form-items H-input" key={HField.id}>
                      <p className="control-label H-input-label">
                        {treeHeightItems[index]}
                      </p>
                      <Controller
                        control={control}
                        // eslint-disable-next-line
                        // @ts-ignore
                        name={`SDMD.H.${index}.value`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            variant="outlined"
                            // error={Boolean(errors.H?.[index])}
                            // helperText={
                            //   errors.H?.[index] && errors.H?.[index].value.message
                            // }
                          />
                        )}
                      />
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DensityManagement;
