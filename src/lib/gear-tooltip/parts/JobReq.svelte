<script lang="ts">
	import type { GearType } from '@malib/gear';
	import { getExtraJobReqString, getExtraJobReqStringByJob } from '../strings';

	export let gearType: GearType;
	export let reqJob: number;
	export let reqSpecJob: number;
	export let characterJob: number;

	$: extraReq = getExtraReq(gearType, reqSpecJob);

	function getExtraReq(gearType: GearType, specJob: number) {
		let req = getExtraJobReqString(gearType);
		if (req === '') {
			req = getExtraJobReqStringByJob(specJob);
		}
		return req;
	}

	function getEnableStates(reqJob: number, job: number) {
		const enable: boolean[] = [];
		for (let i = 0; i <= 5; i++) {
			if (i === 0) {
				enable.push(reqJob <= 0);
				if (reqJob === 0) reqJob = 0x1f;
				if (reqJob === -1) reqJob = 0;
			} else {
				enable.push((reqJob & (1 << (i - 1))) !== 0);
			}
		}
		return enable.map((enabled, i) =>
			enabled ? (checkJobReq(job, i) ? 'enable' : 'disable') : ''
		);
	}

	function checkJobReq(job: number, jobIndex: number): boolean {
		if (jobIndex === 0) return true;
		return (job & (1 << (jobIndex - 1))) !== 0;
	}
</script>

<div class="job-req" class:expand={extraReq !== ''}>
	<div class="job-req__job-branch">
		{#each getEnableStates(reqJob, characterJob) as enable, index}
			<span class="job-{index} {enable}" />
		{/each}
	</div>
	{#if extraReq !== ''}
		<div class="job-req__spec-job">
			{extraReq}
		</div>
	{/if}
</div>

<style>
	.job-req {
		display: flex;
		flex-direction: column;
		background-image: url(../images/job/normal.png);
		width: 237px;
		height: 24px;
	}
	.job-req.expand {
		background-image: url(../images/job/expand.png);
		width: 237px;
		height: 40px;
	}

	.job-req__job-branch {
		display: grid;
		padding-top: 7px;
		padding-left: 15px;
		grid-template-columns: 45px 33px 44px 34px 33px 33px;
	}

	.job-req__spec-job {
		align-self: center;
		margin-top: 6px;
		font-size: 11px;
		letter-spacing: normal;
		font-family: 돋움;
		color: var(--gear-orange2);
	}

	.job-0 {
		width: 31px;
		height: 10px;
	}
	.job-1 {
		width: 19px;
		height: 10px;
	}
	.job-2 {
		width: 30px;
		height: 10px;
	}
	.job-3 {
		width: 20px;
		height: 10px;
	}
	.job-4 {
		width: 19px;
		height: 10px;
	}
	.job-5 {
		width: 18px;
		height: 10px;
	}

	.job-0.enable {
		background-image: url(../images/job/enable/0.png);
	}
	.job-1.enable {
		background-image: url(../images/job/enable/1.png);
	}
	.job-2.enable {
		background-image: url(../images/job/enable/2.png);
	}
	.job-3.enable {
		background-image: url(../images/job/enable/3.png);
	}
	.job-4.enable {
		background-image: url(../images/job/enable/4.png);
	}
	.job-5.enable {
		background-image: url(../images/job/enable/5.png);
	}
	.job-0.disable {
		background-image: url(../images/job/disable/0.png);
	}
	.job-1.disable {
		background-image: url(../images/job/disable/1.png);
	}
	.job-2.disable {
		background-image: url(../images/job/disable/2.png);
	}
	.job-3.disable {
		background-image: url(../images/job/disable/3.png);
	}
	.job-4.disable {
		background-image: url(../images/job/disable/4.png);
	}
	.job-5.disable {
		background-image: url(../images/job/disable/5.png);
	}
</style>
