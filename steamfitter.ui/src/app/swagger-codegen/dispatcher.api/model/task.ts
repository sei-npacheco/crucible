/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

/**
 * Steamfitter API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface Task {
    id?: string;
    name?: string;
    description?: string;
    scenarioTemplateId?: string;
    scenarioId?: string;
    userId?: string;
    action?: Task.ActionEnum;
    vmMask?: string;
    vmList?: Array<string>;
    apiUrl?: string;
    inputString?: string;
    expectedOutput?: string;
    expirationSeconds?: number;
    delaySeconds?: number;
    intervalSeconds?: number;
    iterations?: number;
    triggerTaskId?: string;
    triggerCondition?: Task.TriggerConditionEnum;
    dateCreated?: Date;
    dateModified?: Date;
    createdBy?: string;
    modifiedBy?: string;
}
export namespace Task {
    export type ActionEnum = 'guest_process_run' | 'guest_file_read' | 'guest_file_write' | 'vm_hw_power_off' | 'vm_hw_power_on' | 'vm_create_from_template' | 'vm_hw_remove';
    export const ActionEnum = {
        GuestProcessRun: 'guest_process_run' as ActionEnum,
        GuestFileRead: 'guest_file_read' as ActionEnum,
        GuestFileWrite: 'guest_file_write' as ActionEnum,
        VmHwPowerOff: 'vm_hw_power_off' as ActionEnum,
        VmHwPowerOn: 'vm_hw_power_on' as ActionEnum,
        VmCreateFromTemplate: 'vm_create_from_template' as ActionEnum,
        VmHwRemove: 'vm_hw_remove' as ActionEnum
    };
    export type TriggerConditionEnum = 'Time' | 'Success' | 'Failure' | 'Completion' | 'Expiration' | 'Manual';
    export const TriggerConditionEnum = {
        Time: 'Time' as TriggerConditionEnum,
        Success: 'Success' as TriggerConditionEnum,
        Failure: 'Failure' as TriggerConditionEnum,
        Completion: 'Completion' as TriggerConditionEnum,
        Expiration: 'Expiration' as TriggerConditionEnum,
        Manual: 'Manual' as TriggerConditionEnum
    };
}


