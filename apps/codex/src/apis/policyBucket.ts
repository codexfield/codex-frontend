import { GreenfieldClient } from '@/config/GnfsClient';
import {
  GRNToString,
  PermissionTypes,
  newGroupGRN,
  newObjectGRN,
} from '@bnb-chain/greenfield-js-sdk';

export const policyBucket = async (address: string, bucketName: string, groupName: string) => {
  const statement: PermissionTypes.Statement = {
    effect: PermissionTypes.Effect.EFFECT_ALLOW,
    actions: [PermissionTypes.ActionType.ACTION_GET_OBJECT],
    resources: [GRNToString(newObjectGRN(bucketName, '*'))],
  };
  const principal = {
    type: PermissionTypes.PrincipalType.PRINCIPAL_TYPE_GNFD_GROUP,
    value: GRNToString(newGroupGRN(address as string, groupName)),
  };

  return await GreenfieldClient.bucket.putBucketPolicy(bucketName, {
    operator: address,
    statements: [statement],
    principal,
  });
};
